import { noop } from '@mantine/utils'
import { createContext, useContext } from 'react'

type IEditorContext = {
  values: Record<string, any>
  flattenValues: Record<string, any>
  activePath?: string
  activeEditor: Record<string, any>
  selected?: string
  formValues: {}
  add: (key: string, value: Record<string, any> | string) => void
  remove: (key: string | undefined) => void
  setActivePath: (key: string) => void
  setActiveEditor: (values: {}) => void
  setSelected: (key: string) => void
  setFormValues: (data: {}) => void
  save: (data: {} | undefined) => Promise<void>
  saveAs: (data: {} | undefined) => Promise<void>
  open: () => Promise<void>
}

export const EditorContext = createContext<IEditorContext>({
  values: {},
  flattenValues: {},
  activePath: '',
  activeEditor: {},
  selected: '',
  formValues: {},
  add: noop,
  remove: noop,
  setActivePath: noop,
  setActiveEditor: noop,
  setSelected: noop,
  setFormValues: noop,
  save: async () => {},
  saveAs: async () => {},
  open: async () => {}
})

export default function useEditor() {
  return useContext(EditorContext)
}
