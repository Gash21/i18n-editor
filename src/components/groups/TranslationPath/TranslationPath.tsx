import { createStyles, NavLink } from '@mantine/core'
import { ReactNode } from 'react'

export default function Translation({ data, parent, onClick, selected }) {
  const populateData = (translation) => {
    const newParent = parent ? `${parent}.` : ''
    const HTML: ReactNode[] = []
    for (const x in translation) {
      const id = `${newParent}${x}`
      if (typeof translation[x] === 'object') {
        HTML.push(
          <Accordion
            onClick={onClick}
            key={x}
            data={translation[x]}
            label={x}
            id={id}
            selected={selected}
          />
        )
      }
    }
    return HTML
  }

  return <div>{populateData(data).map((el) => el)}</div>
}

const AccordionStyles = createStyles(() => {
  return {
    navLink: {
      borderLeft: '1px #61636a solid'
    }
  }
})

const Accordion = ({ data, label, id, onClick, selected }) => {
  const { classes } = AccordionStyles()
  if (!data) {
    return <span></span>
  }
  return (
    <NavLink
      childrenOffset={12}
      py={4}
      onClick={() => onClick(id)}
      id={id}
      label={label}
      active={id === selected}
      className={classes.navLink}
      rightSection={null}
    >
      <Translation data={data} parent={`${id}`} onClick={onClick} selected={selected} />
    </NavLink>
  )
}
