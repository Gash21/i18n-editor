import { MakeGenerics } from '@tanstack/react-location'

export type LocationGenerics = MakeGenerics<{
  Params: {
    status: string
    ID: string
  }
  RouteMeta: {
    backLink?: boolean
    breadcrumb: (params: LocationGenerics['Params']) => React.ReactElement | string
  }
}>
