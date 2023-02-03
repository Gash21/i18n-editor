import { Outlet, ReactLocation, Router } from '@tanstack/react-location'
import { ReactElement } from 'react'
import { publicRoutes, LocationGenerics } from '@renderer/routes'

export const L = new ReactLocation<LocationGenerics>()

const location = new ReactLocation()

export default function RouteProvider(): ReactElement {
  const routes = publicRoutes
  return (
    <Router
      defaultPendingElement={
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ height: 50, width: 50 }}>Loading...</div>
        </div>
      }
      defaultPendingMinMs={250}
      defaultPendingMs={500}
      location={location}
      routes={routes}
    >
      <Outlet />
    </Router>
  )
}
