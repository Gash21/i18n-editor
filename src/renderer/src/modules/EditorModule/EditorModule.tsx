import {
  Button,
  Code,
  Divider,
  Flex,
  Grid,
  Group,
  Modal,
  NavLink,
  Text,
  TextInput,
  createStyles
} from '@mantine/core'
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
  const [activeEditor, setActiveEditor] = useState({})

  const toggleModalSegment = useCallback(() => {
    setOpenSegModal((p) => !p)
  }, [openSegModal])

  const toggleModalItem = useCallback(() => {
    if (!selectedPath) {
      alert('Kamu belum memilih segment')
      return
    }
    setOpenItModal((p) => !p)
  }, [openItModal, selectedPath, translationFlat])

  const saveSegment = () => {
    const value = watch('newSegment')
    if (value) {
      setTranslationFlat((p) => ({ ...p, [value]: {} }))
    }
    toggleModalSegment()
  }

  const saveItem = useCallback(() => {
    const value = watch('newItem')
    if (value) {
      const newValue = `${selectedPath}.${value}`
      setTranslationFlat((p) => ({ ...p, [newValue]: '' }))
      setActiveData(newValue)
    }
    toggleModalItem()
  }, [selectedPath])

  useEffect(() => {
    setValue('newItem', '')
    setTranslation({ ...unflattenObject(translationFlat) })
  }, [translationFlat])

  const setActiveData = (id) => {
    const newData = Object.keys(translationFlat).reduce((res, key) => {
      if (key.indexOf(id) > -1) {
        if (typeof translationFlat[key] === 'string') {
          res[key] = translationFlat[key]
        }
      }
      return res
    }, {})
    setActiveEditor(newData)
  }

  const setActive = (id) => {
    setSelectedPath(id)
  }

  useEffect(() => {
    setValue('newSegment', selectedPath)
    setActiveData(selectedPath)
  }, [selectedPath])

  return (
    <Grid>
      <Grid.Col sm={4} md={3}>
        <Group mb="lg">
          <Button variant="outline" onClick={toggleModalSegment}>
            Add Segment
          </Button>
          <Button variant="outline" disabled={!selectedPath} onClick={toggleModalItem}>
            Add Item
          </Button>
        </Group>
        <Translation activePath={selectedPath} onClick={setActive} data={translation} parent="" />
      </Grid.Col>
      <Grid.Col sm={8} md={9}>
        {Object.keys(activeEditor).map((label) => (
          <InputGroup key={label} data={activeEditor[label]} name={label} label={label} />
        ))}
      </Grid.Col>

      <Modal title="Add Segment" opened={openSegModal} centered onClose={toggleModalSegment}>
        <Divider mb="sm" />
        <TextInput
          value={watch('newSegment')}
          onChange={({ target }) => {
            setValue('newSegment', target.value.toLowerCase().replace(/[^a-zA-Z0-9.\-\_/]*$/g, ''))
          }}
        />
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
    </Grid>
  )
}

const Translation = ({ data, parent, onClick, activePath }) => {
  const populateData = (translation) => {
    const newParent = parent ? `${parent}.` : ''
    const HTML: ReactNode[] = []
    for (const x in translation) {
      const id = `${newParent}${x}`
      if (typeof translation[x] === 'object') {
        HTML.push(
          <Accordion
            onClick={onClick}
            key={x}
            data={translation[x]}
            label={x}
            id={id}
            activePath={activePath}
          />
        )
      }
    }
    return HTML
  }

  return <div>{populateData(data).map((el) => el)}</div>
}

const AccordionStyles = createStyles(() => {
  return {
    navLink: {
      borderLeft: '1px #61636a solid'
    }
  }
})

const Accordion = ({ data, label, id, onClick, activePath }) => {
  const { classes } = AccordionStyles()
  if (!data) {
    return <span></span>
  }
  return (
    <NavLink
      childrenOffset={12}
      onClick={() => onClick(id)}
      id={id}
      label={label}
      active={id === activePath}
      className={classes.navLink}
      rightSection={null}
    >
      <Translation data={data} parent={`${id}`} onClick={onClick} activePath={activePath} />
    </NavLink>
  )
}

const InputGroup = ({ data, name, label }) => {
  const { register } = useFormContext()
  if (typeof data !== 'string') {
    return <span></span>
  }

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
