import { MantineProvider } from '@mantine/core'
import { MainModule } from './modules'

function App(): JSX.Element {
  return (
    <MantineProvider>
      <MainModule />
    </MantineProvider>
  )
}

export default App
