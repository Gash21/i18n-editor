import { MantineProvider } from '@mantine/core'
import RouteProvider from './components/hoc/RouteProvider'

function App(): JSX.Element {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <RouteProvider />
    </MantineProvider>
  )
}

export default App
