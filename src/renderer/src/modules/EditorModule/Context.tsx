import React, { useState } from 'react'

const TranslationContext = React.createContext({})

const TranslationProvider = ({ children }) => {
  const [translation, setTranslation] = useState({})

  const addTranslation = (path, value) => {
    setTranslation((prevTranslation) => {
      let current = prevTranslation
      path.forEach((part, index) => {
        current[part] = current[part] || {}
        if (index === path.length - 1) {
          current[part] = value
        } else {
          current = current[part]
        }
      })
      return { ...prevTranslation, ...current }
    })
  }

  return (
    <TranslationContext.Provider value={{ translation, addTranslation }}>
      {children}
    </TranslationContext.Provider>
  )
}

export { TranslationContext, TranslationProvider }
