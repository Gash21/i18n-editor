import { id } from '@logee-fe/i18n'
import { Button, Flex, NavLink, TextInput } from '@mantine/core'
// import { Fragment } from 'react'

export default function MainModule(): JSX.Element {
  const openFile = async () => {
    const res = await window.electron.ipcRenderer.invoke('open-file')
    console.log(res)
  }

  // const saveFile = async () => {
  //   await window.electron.ipcRenderer.invoke('save-file', JSON.stringify(id, null, 2))
  // }
  const RenderAccordion = ({ label, value }) => {
    return <NavLink label={label}>{value}</NavLink>
  }
  const remap = (values: any) => {
    return Object.entries(values).map(([label, value]) => {
      if (typeof value === 'string') {
        console.log(label)
        return (
          <Flex direction="column" mb="lg" key={label}>
            <TextInput icon="id" label={label} defaultValue={value} />
            <TextInput icon="en" mt="sm" defaultValue={value} />
          </Flex>
        )
      }
      return <RenderAccordion label={label} value={remap(value)} />
    })
  }

  return (
    <Flex direction="column">
      {Object.entries(id).map(([label, value]) => {
        return (
          <NavLink key={label} label={label}>
            {remap(value)}
          </NavLink>
        )
      })}
      <Button mt="lg" fullWidth onClick={openFile}>
        Open File
      </Button>
    </Flex>
  )
}
