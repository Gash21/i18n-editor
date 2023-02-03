import { Outlet } from '@tanstack/react-location'
import Header from '@renderer/components/layouts/Header'
import { AppShell } from '@mantine/core'
import { FormProvider, useForm } from 'react-hook-form'

export default function EditorLayout() {
  const methods = useForm()
  const onSave = () => {
    console.log('saved')
  }
  return (
    <form onSubmit={methods.handleSubmit(onSave)}>
      <AppShell header={<Header />}>
        <FormProvider {...methods}>
          <Outlet />
        </FormProvider>
      </AppShell>
    </form>
  )
}
