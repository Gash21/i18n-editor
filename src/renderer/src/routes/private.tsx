import { Navigate, Route } from '@tanstack/react-location'
import { LocationGenerics } from './LocationGenerics'

const privateRoutes: Route<LocationGenerics>[] = [
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
    path: '/photo',
    element: () =>
      import('@regu/cms/components/templates/DashboardTemplate').then(({ default: Component }) => (
        <Component />
      )),
    children: [
      {
        path: '/',
        element: () =>
          import('@regu/cms/components/modules/PhotoModule').then(({ default: ChildComponent }) => (
            <ChildComponent />
          ))
      }
    ]
  },
  {
    path: '/video',
    element: () =>
      import('@regu/cms/components/templates/DashboardTemplate').then(({ default: Component }) => (
        <Component />
      )),
    children: [
      {
        path: '/',
        element: () =>
          import('@regu/cms/components/modules/HomeModule').then(({ default: ChildComponent }) => (
            <ChildComponent />
          ))
      }
    ]
  },
  {
    path: '/blog',
    element: () =>
      import('@regu/cms/components/templates/DashboardTemplate').then(({ default: Component }) => (
        <Component />
      )),
    children: [
      {
        path: '/',
        element: () =>
          import('@regu/cms/components/modules/HomeModule').then(({ default: ChildComponent }) => (
            <ChildComponent />
          ))
      }
    ]
  },
  {
    path: '/client',
    element: () =>
      import('@regu/cms/components/templates/DashboardTemplate').then(({ default: Component }) => (
        <Component />
      )),
    children: [
      {
        path: '/',
        element: () =>
          import('@regu/cms/components/modules/HomeModule').then(({ default: ChildComponent }) => (
            <ChildComponent />
          ))
      }
    ]
  },
  {
    element: <Navigate to="/home" />
  }
]

export default privateRoutes
