import { id, en } from '@logee-fe/i18n'
import { Button, Container, Flex, NavLink, TextInput } from '@mantine/core'

export default function MainModule(): JSX.Element {
  const openFile = async () => {
    const res = await window.electron.ipcRenderer.invoke('open-file')
    console.log(res)
  }

  const saveFile = async () => {
    await window.electron.ipcRenderer.invoke('save-file', JSON.stringify(id, null, 2))
  }
  const RenderAccordion = ({ label, value }) => {
    return <NavLink label={label}>{value}</NavLink>
  }
  const remap = (values: any) => {
    return Object.entries(values).map(([label, value], index) => {
      if (typeof value === 'string') {
        return (
          <Flex mt="lg" mb="lg" direction="column">
            <TextInput icon="id" label={label} defaultValue={value} />
            <TextInput icon="en" mt="sm" defaultValue={value} />
          </Flex>
        )
      }
      return <RenderAccordion label={label} value={remap(value)} />
    })
  }

  return (
    <Container m={2} p="lg" styles={{ width: '100vw' }}>
      {Object.entries(id).map(([key, value]) => {
        console.log(key)
        return <NavLink label={key}>{remap(value)}</NavLink>
      })}
      <Button mt="lg" fullWidth onClick={openFile}>
        Open File
      </Button>
      <Button mt="lg" fullWidth onClick={saveFile}>
        Save File
      </Button>
    </Container>
  )
}
