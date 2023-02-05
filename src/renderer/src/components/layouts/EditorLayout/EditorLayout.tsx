import { Outlet } from '@tanstack/react-location'
import Header from '@renderer/components/layouts/Header'
import { AppShell } from '@mantine/core'
import { FormProvider, useForm } from 'react-hook-form'
import { EditorProvider, useEditor } from '@renderer/contexts/EditorContext'
import ModalSegment from '@renderer/components/forms/ModalSegment'
import ModalItem from '@renderer/components/forms/ModalItem'
import { useCallback, useState } from 'react'

export default function EditorLayout() {
  return (
    <EditorProvider defaultValues={{}}>
      <FormLayout />
    </EditorProvider>
  )
}

const FormLayout = () => {
  const methods = useForm()
  const { save } = useEditor()
  const [openSegment, setOpenSegment] = useState(false)
  const [openItem, setOpenItem] = useState(false)
  const toggleSegment = useCallback(() => {
    setOpenSegment((p) => !p)
  }, [openSegment])

  const toggleItem = useCallback(() => {
    setOpenItem((p) => !p)
  }, [openItem])
  return (
    <form onSubmit={methods.handleSubmit(save)}>
      <AppShell header={<Header openSegment={toggleSegment} openItem={toggleItem} />}>
        <FormProvider {...methods}>
          <Outlet />
          <ModalSegment opened={openSegment} toggleModal={toggleSegment} />
          <ModalItem opened={openItem} toggleModal={toggleItem} />
        </FormProvider>
      </AppShell>
    </form>
  )
}
