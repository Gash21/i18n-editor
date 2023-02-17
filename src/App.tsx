import { MantineProvider } from "@mantine/core";
import RouteProvider from "./components/hoc/RouteProvider";
import { ConfigProvider } from "./contexts/ConfigContext";

function App(): JSX.Element {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <ConfigProvider>
        <RouteProvider />
      </ConfigProvider>
    </MantineProvider>
  );
}

export default App;
