import { Navbar as NavbarComponent, ScrollArea, createStyles } from '@mantine/core'
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock
} from '@tabler/icons-react'
import LinksGroup from './LinksGroup'
import useStyles from './Navbar.styles'

import sample from '@renderer/locale/sample.json'
import { useEffect, useState } from 'react'
import { flattenObject, unflattenObject } from '@renderer/utils/object'

const mockdata = [
  { label: 'Dashboard', icon: <IconGauge /> },
  {
    label: 'Market news',
    icon: <IconNotes />,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' }
    ]
  },
  {
    label: 'Releases',
    icon: <IconCalendarStats />,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' }
    ]
  },
  { label: 'Analytics', icon: <IconPresentationAnalytics /> },
  { label: 'Contracts', icon: <IconFileAnalytics /> },
  { label: 'Settings', icon: <IconAdjustments /> },
  {
    label: 'Security',
    icon: <IconLock />,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' }
    ]
  }
]

export default function Navbar() {
  const { classes } = useStyles()
  const [navigation, setNavigation] = useState(null)
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />)
  const remapValues = (data, values = {}) => {
    return Object.entries(data).map(([k, v]) => {
      if (typeof v === 'object') {
        const newValues = { label: k, values: remapValues(v) }
        return newValues
      } else {
        return { ...values, label: k, translation: v }
      }
    })
  }

  const remapKeys = (data, values = []) => {
    if (typeof data !== 'object') {
      return [...values, data]
    } else {
      return Object.keys(data).flatMap((v) => remapKeys(v, values))
    }
  }
  useEffect(() => {
    const remap = remapValues(sample)
    const remapKey = remapKeys(sample)
    const flattenId = flattenObject(sample, 'id')
    const flattenEn = flattenObject(sample, 'en')
    const unflatten = unflattenObject({ ...flattenId, ...flattenEn })
    console.log({ remap, flattenId, flattenEn, unflatten, remapKey })
  }, [])
  return (
    <NavbarComponent height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <NavbarComponent.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </NavbarComponent.Section>
    </NavbarComponent>
  )
}
