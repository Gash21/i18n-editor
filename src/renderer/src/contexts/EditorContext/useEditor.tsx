import { noop } from '@mantine/utils'
import { createContext, useContext } from 'react'

type IEditorContext = {
  values: Record<string, any>
  changeValues: (values: Record<string, any>) => void
}

export const EditorContext = createContext<IEditorContext>({
  values: {},
  changeValues: noop
})

export default function useEditor() {
  return useContext(EditorContext)
}
