import { Button, Divider, Group, Modal, TextInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { useEditor } from '@renderer/contexts/EditorContext'

type IModalProps = {
  opened: boolean
  toggleModal: () => void
}

export default function NamespaceModal({ opened, toggleModal }: IModalProps) {
  const { watch, setValue } = useFormContext()
  const { add } = useEditor()

  const normalizeValue = (key: string, value: string) => {
    const regex = /[^a-zA-Z0-9.\-\_]*$/g
    setValue(key, value.toLowerCase().replace(regex, ''))
  }

  const onSave = () => {
    const key = watch('newNamespace')
    if (key) {
      add(key, {})
    }
    toggleModal()
  }
  return (
    <Modal title="Add Namespace" opened={opened} centered onClose={toggleModal}>
      <Divider mb="sm" />
      <TextInput
        value={watch('newNamespace')}
        onChange={({ target }) => normalizeValue('newNamespace', target.value)}
      />
      <Group mt="xl">
        <Button variant="outline" onClick={onSave}>
          Buat Namespace
        </Button>
      </Group>
    </Modal>
  )
}
