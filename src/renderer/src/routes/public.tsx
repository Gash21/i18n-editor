import { Navigate, Route } from '@tanstack/react-location'
import { LocationGenerics } from './LocationGenerics'

const publicRoutes: Route<LocationGenerics>[] = [
  {
    path: '/home',
    element: () =>
      import('@renderer/components/layouts/DefaultLayout').then(({ default: Component }) => (
        <Component />
      )),
    children: [
      {
        path: '/',
        element: () =>
          import('@renderer/modules/HomeModule').then(({ default: ChildComponent }) => (
            <ChildComponent />
          ))
      }
    ]
  },
  {
    path: '/new',
    element: () =>
      import('@renderer/components/layouts/EditorLayout').then(({ default: Component }) => (
        <Component />
      )),
    children: [
      {
        path: '/',
        element: () =>
          import('@renderer/modules/EditorModule').then(({ default: ChildComponent }) => (
            <ChildComponent />
          ))
      }
    ]
  },
  {
    path: '/open',
    element: () =>
      import('@renderer/components/layouts/EditorLayout').then(({ default: Component }) => (
        <Component />
      )),
    children: [
      {
        path: '/',
        element: () =>
          import('@renderer/modules/MainModule').then(({ default: ChildComponent }) => (
            <ChildComponent />
          ))
      }
    ]
  },
  {
    element: <Navigate to="/home" />
  }
]

export default publicRoutes
