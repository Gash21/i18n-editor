import { Button, Divider, Group, Modal, TextInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { useEditor } from '@renderer/contexts/EditorContext'

export default function SegmentModal({ opened, toggleModal }) {
  const { watch, setValue } = useFormContext()
  const { add } = useEditor()

  const normalizeValue = (key: string, value: string) => {
    const regex = /[^a-zA-Z0-9.\-\_]*$/g
    setValue(key, value.toLowerCase().replace(regex, ''))
  }

  const onSave = () => {
    const key = watch('newSegment')
    if (key) {
      add(key, {})
    }
    toggleModal()
  }
  return (
    <Modal title="Add Segment" opened={opened} centered onClose={toggleModal}>
      <Divider mb="sm" />
      <TextInput
        value={watch('newSegment')}
        onChange={({ target }) => normalizeValue('newSegment', target.value)}
      />
      <Group mt="xl">
        <Button variant="outline" onClick={onSave}>
          Buat Segment
        </Button>
      </Group>
    </Modal>
  )
}
