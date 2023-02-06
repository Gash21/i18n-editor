import { flattenObject, unflattenObject } from '@renderer/utils/object'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { EditorContext } from './useEditor'
import { noop } from '@mantine/utils'

type IEditorProvProps = {
  defaultValues: {}
  defaultActivePath?: string
  defaultSelected?: string
  defaultActiveEditor?: {}
  children: ReactNode
}

export default function EditorProvider({
  defaultValues,
  children,
  defaultActivePath = '',
  defaultSelected = '',
  defaultActiveEditor = {}
}: IEditorProvProps) {
  const [values, setValues] = useState<{}>(defaultValues)
  const [formValues, setFormValues] = useState<{}>({
    id: defaultValues,
    en: defaultValues
  })
  const [activePath, setActivePath] = useState(defaultActivePath)
  const [selected, setSelected] = useState(defaultSelected)
  const [activeEditor, setActiveEditor] = useState(defaultActiveEditor)
  const [flattenValues, setFlattenValues] = useState(flattenObject(defaultValues))

  const add = (key: string, value = {}) => {
    setFlattenValues((fV: {}) => ({ ...fV, [key]: value }))
  }

  const handleKeyPress = useCallback(async (event: KeyboardEvent) => {
    const { keyCode, metaKey, ctrlKey, altKey } = event
    switch (keyCode) {
      case 79:
        if (metaKey || ctrlKey) {
          await open()
        }
        break
      case 83:
        if (altKey) {
          noop()
        }
        if (metaKey || ctrlKey) {
          await save(values)
        }
        break
      case 73:
        if (altKey) {
          noop()
        }
        break
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  const remove = (key: string) => {
    const newValues = { ...flattenValues }
    delete newValues[key]
    setFlattenValues(newValues)
  }

  useEffect(() => {
    setValues(unflattenObject(flattenValues))
  }, [flattenValues])

  const save = async (data) => {
    await window.electron.ipcRenderer.invoke('save-file', { id: data.id, en: data.en })
  }

  const open = async () => {
    const res = await window.electron.ipcRenderer.invoke('open-file')
    setFormValues({ id: res.id, en: res.en })
    setValues(res.values)
    setFlattenValues(flattenObject(res.values))
    setActivePath(res.path)
  }

  const contextValue = useMemo(
    () => ({
      values,
      flattenValues,
      activePath,
      activeEditor,
      selected,
      formValues,
      add,
      remove,
      setActivePath,
      setActiveEditor,
      setSelected,
      setFormValues,
      save,
      open
    }),
    [values, flattenValues, activePath, activeEditor, selected, formValues]
  )

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>
}
