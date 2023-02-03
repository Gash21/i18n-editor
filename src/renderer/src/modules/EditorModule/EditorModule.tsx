import { Button, Code, Divider, Flex, Group, Modal, NavLink, Text, TextInput } from '@mantine/core'
import { unflattenObject } from '@renderer/utils/object'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function EditorModule() {
  const { register, watch, setValue } = useFormContext()
  const [openSegModal, setOpenSegModal] = useState(false)
  const [openItModal, setOpenItModal] = useState(false)
  const [translationFlat, setTranslationFlat] = useState({})
  const [translation, setTranslation] = useState({})
  const [selectedPath, setSelectedPath] = useState('')

  const toggleModalSegment = useCallback(() => {
    setOpenSegModal((p) => !p)
  }, [openSegModal])

  const toggleModalItem = useCallback(() => {
    setOpenItModal((p) => !p)
  }, [openItModal])

  const saveSegment = useCallback(() => {
    const value = watch('newSegment')
    if (value) {
      setTranslationFlat((p) => ({ ...p, [value]: {} }))
    }
    toggleModalSegment()
  }, [])

  const saveItem = useCallback(() => {
    const value = watch('newItem')
    if (value) {
      const newValue = `${selectedPath}.${value}`
      setTranslationFlat((p) => ({ ...p, [newValue]: '' }))
    }
    toggleModalItem()
  }, [selectedPath])

  useEffect(() => {
    setValue('newItem', '')
    setTranslation(unflattenObject(translationFlat))
  }, [translationFlat])

  const setActive = (id) => {
    setSelectedPath(id)
  }

  useEffect(() => {
    setValue('newSegment', selectedPath)
  }, [selectedPath])

  return (
    <Flex direction="column">
      <Group>
        <Button onClick={toggleModalSegment}>Add Segment</Button>
        <Button onClick={toggleModalItem}>Add Item</Button>
      </Group>

      <Translation onClick={setActive} data={translation} parent="" />
      <Modal title="Add Segment" opened={openSegModal} centered onClose={toggleModalSegment}>
        <Divider />
        <TextInput {...register('newSegment')} />
        <Group mt="xl">
          <Button variant="outline" onClick={saveSegment}>
            Buat Segment
          </Button>
        </Group>
      </Modal>
      <Modal title="Add Item Text" opened={openItModal} centered onClose={toggleModalItem}>
        <Divider mb="sm" />
        <Text mb="xs">Menambahkan translation text untuk segment</Text>
        <Code>{selectedPath}</Code>
        <Divider my="sm" />
        <TextInput
          label="Text Key"
          placeholder="e.g label, warning, default"
          labelProps={{ mb: 'sm' }}
          {...register('newItem')}
        />
        <Group mt="xl">
          <Button variant="outline" onClick={saveItem}>
            Buat Item
          </Button>
        </Group>
      </Modal>
    </Flex>
  )
}

const Translation = ({ data, parent, onClick }) => {
  const populateData = useCallback(
    (translation) => {
      const newParent = parent ? `${parent}.` : ''
      const HTML: ReactNode[] = []
      for (const x in translation) {
        const id = `${newParent}${x}`
        if (typeof translation[x] === 'object') {
          HTML.push(<Accordion onClick={onClick} key={x} data={translation[x]} label={x} id={id} />)
        } else {
          console.log(x, 'masuk ke else')
          HTML.push(<InputGroup key={x} label={x} data={translation[x]} name={id} />)
        }
      }
      return HTML
    },
    [data]
  )

  return <div>{populateData(data).map((el) => el)}</div>
}

const Accordion = ({ data, label, id, onClick }) => {
  if (!data) {
    console.log(data, 'kosong')
    return <span></span>
  }
  return (
    <NavLink onClick={() => onClick(id)} id={id} label={label}>
      <Translation data={data} parent={`${id}`} onClick={onClick} />
      {/* <Button variant="outline" my="sm" fullWidth>
        Add Text Item
      </Button> */}
    </NavLink>
  )
}

const InputGroup = ({ data, name, label }) => {
  const { register } = useFormContext()
  console.log('Akhirnya masuk input', data, name)

  return (
    <Flex direction="column" mx="sm">
      <TextInput
        icon="id"
        label={label}
        labelProps={{ my: 'sm' }}
        mb="sm"
        {...register(`id.${name}`)}
      />
      <TextInput icon="en" {...register(`en.${name}`)} />
    </Flex>
  )
}
