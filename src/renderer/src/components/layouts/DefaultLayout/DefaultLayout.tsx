import { Outlet } from '@tanstack/react-location'
import { Fragment, ReactNode } from 'react'

export default function DefaultLayout() {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
