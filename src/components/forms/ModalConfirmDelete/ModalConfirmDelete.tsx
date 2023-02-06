import { Button, Code, Divider, Flex, Group, Modal, Text } from '@mantine/core'
import { useEditor } from '@renderer/contexts/EditorContext'

type DeleteType = 'namespace' | 'item'

type IModalProps = {
  opened: boolean
  toggleModal: () => void
  onSubmit: () => void
  onCancel: () => void
  type?: DeleteType
  selected?: string
}

export default function ModalConfirmDelete({
  opened,
  toggleModal,
  onSubmit,
  onCancel,
  type = 'namespace',
  selected
}: IModalProps) {
  const submit = () => {
    onSubmit()
    toggleModal()
  }
  return (
    <Modal opened={opened} centered onClose={toggleModal} size="sm" title={`Delete ${type}`}>
      <Divider mb="xl" />
      <Text mb="md">Are you sure you want to delete {type} below ?</Text>
      <Code>{selected}</Code>
      <Group noWrap mt="md"></Group>
      <Flex mt="xl" justify="space-between">
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="outline" onClick={submit} color="red">
          Delete
        </Button>
      </Flex>
    </Modal>
  )
}
