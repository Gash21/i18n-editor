import { ReactNode, useMemo, useState } from 'react'
import { EditorContext } from './useEditor'

type IEditorProvProps = {
  defaultValues: Record<string, any>
  children: ReactNode
}

export default function EditorProvider({ defaultValues, children }: IEditorProvProps) {
  const [values, setValues] = useState(defaultValues)

  const changeValues = (data) => {
    setValues(data)
  }

  const contextValue = useMemo(() => ({ values, changeValues }), [values])

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>
}
