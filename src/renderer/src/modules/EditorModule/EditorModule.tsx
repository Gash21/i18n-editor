import {
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Modal,
  NavLink,
  TextInput,
  createStyles
} from '@mantine/core'
import { useEditor } from '@renderer/contexts/EditorContext'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function EditorModule() {
  const { watch, setValue } = useFormContext()
  const { values, flattenValues, activeEditor, selected, setSelected, setActiveEditor, add } =
    useEditor()
  const [openSegModal, setOpenSegModal] = useState(false)
  const [openItModal, setOpenItModal] = useState(false)

  const toggleModalSegment = useCallback(() => {
    setOpenSegModal((p) => !p)
  }, [openSegModal])

  const toggleModalItem = useCallback(() => {
    if (!selected) {
      alert('Kamu belum memilih segment')
      return
    }
    setOpenItModal((p) => !p)
  }, [openItModal, selected, flattenValues])

  const saveSegment = () => {
    const key = watch('newSegment')
    if (key) {
      add(key, {})
    }
    toggleModalSegment()
  }

  const saveItem = useCallback(() => {
    const value = watch('newItem')
    if (value) {
      const newValue = `${selected}.${value}`
      add(newValue, '')
      setActiveData(newValue)
    }
    toggleModalItem()
  }, [selected])

  useEffect(() => {
    console.log(values)
  }, [values])

  useEffect(() => {
    setValue('newItem', '')
  }, [flattenValues])

  const setActiveData = (id) => {
    const newData = Object.keys(flattenValues).reduce((res, key) => {
      if (key.indexOf(id) > -1) {
        if (typeof flattenValues[key] === 'string') {
          res[key] = flattenValues[key]
        }
      }
      return res
    }, {})
    setActiveEditor(newData)
  }

  useEffect(() => {
    setValue('newSegment', selected)
    setActiveData(selected)
  }, [selected])

  const normalizeValue = (key: string, value: string) => {
    let regex = /[^a-zA-Z0-9.\-\_]*$/g
    if (key === 'newItem') {
      regex = /[^a-zA-Z0-9\-\_]*$/g
    }
    setValue(key, value.toLowerCase().replace(regex, ''))
  }

  return (
    <Grid mih="90vh">
      <Grid.Col sm={4} md={3} style={{ borderRight: '1px #61636a solid' }}>
        <Translation selected={selected} onClick={setSelected} data={values} parent="" />
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
          onChange={({ target }) => normalizeValue('newSegment', target.value)}
        />
        <Group mt="xl">
          <Button variant="outline" onClick={saveSegment}>
            Buat Segment
          </Button>
        </Group>
      </Modal>
    </Grid>
  )
}

const Translation = ({ data, parent, onClick, selected }) => {
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
            selected={selected}
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

const Accordion = ({ data, label, id, onClick, selected }) => {
  const { classes } = AccordionStyles()
  if (!data) {
    return <span></span>
  }
  return (
    <NavLink
      childrenOffset={12}
      py={4}
      onClick={() => onClick(id)}
      id={id}
      label={label}
      active={id === selected}
      className={classes.navLink}
      rightSection={null}
    >
      <Translation data={data} parent={`${id}`} onClick={onClick} selected={selected} />
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
