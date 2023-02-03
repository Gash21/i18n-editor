import { Button, Flex, NavLink } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function EditorModule() {
  const [translation, setTranslation] = useState({})
  const findChild = (objects, key, depth = 0) => {
    for (const x in objects) {
      if (x === key) {
        const getTotalData = Object.keys(objects[key]).length
        objects[x][`${x}-${getTotalData}`] = {}
      }
      if (typeof objects[x] === 'object') {
        return findChild(objects[x], key, depth + 1)
      }
    }
    return objects
  }
  const addSegment = (parent = null) => {
    if (parent) {
      setTranslation((t) => {
        const entries = Object.entries(t).map(([label, value]) => {
          if (label === parent) {
            const currentChild = Object.keys(t[parent]).length
            if (typeof value === 'object') {
              value = { ...value, [`${parent}-${currentChild}`]: {} }
            } else {
              value = { [`${parent}-${currentChild}`]: {} }
            }
          }
          return [label, value]
        })
        const fromEntries = Object.fromEntries(entries)
        return fromEntries
      })
    } else {
      setTranslation((t) => ({ ...t, [`new-${Object.keys(t).length}`]: {} }))
    }
  }

  useEffect(() => {
    console.log(JSON.stringify(translation, null, 2))
  }, [translation])

  const remapObject = (data) => {
    return Object.entries(data).map(([label, value], index) => {
      return (
        <NavLink
          suppressContentEditableWarning
          contentEditable
          key={`${label}-${index}`}
          label={`${label}`}
          onBlur={({ target }) => {
            console.log(label)
            console.log(target.innerText)
          }}
        >
          {remapObject(value)}
          <Button my="xl" variant="outline" onClick={() => addSegment(label)} fullWidth>
            Add New Segment
          </Button>
        </NavLink>
      )
    })
  }

  return (
    <Flex direction="column">
      {remapObject(translation)}
      <Button my="xl" variant="outline" onClick={() => addSegment()} fullWidth>
        Add Main Segment
      </Button>
    </Flex>
  )
}
