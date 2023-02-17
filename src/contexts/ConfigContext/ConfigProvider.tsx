import { ReactNode, useEffect, useMemo, useState } from "react";
import { ConfigContext } from "./useConfig";

type IConfigProps = {
  children: ReactNode;
};

export type Config = {
  exportConfig: {
    json: boolean;
    flatten: boolean;
    minify: boolean;
  };
};

const getInitialConfig = () => {
  const config = localStorage.getItem("app_config");
  return config
    ? JSON.parse(config)
    : {
        exportConfig: {
          json: true,
          flatten: false,
          minify: false,
        },
      };
};

export default function ConfigProvider({ children }: IConfigProps) {
  const [configState, setConfigState] = useState<Config>(getInitialConfig());

  const setConfig = (config: Config) => {
    setConfigState({ ...config });
  };

  useEffect(() => {
    localStorage.setItem("app_config", JSON.stringify(configState));
  }, [configState]);

  const configContext = useMemo(
    () => ({
      exportConfig: configState.exportConfig,
      setConfig,
    }),
    [configState, setConfig]
  );
  return (
    <ConfigContext.Provider value={configContext}>
      {children}
    </ConfigContext.Provider>
  );
}
