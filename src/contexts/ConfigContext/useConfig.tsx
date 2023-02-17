import { createContext, useContext } from "react";
import { Config } from "./ConfigProvider";

type IConfigContext = {
  exportConfig: {
    json: boolean;
    flatten: boolean;
    minify: boolean;
  };
  setConfig: (config: Config) => void;
};

export const ConfigContext = createContext({
  exportConfig: {
    json: true,
    flatten: false,
    minify: false,
  },
  setConfig: (_config: Config) => {},
});

export default function useConfig() {
  return useContext(ConfigContext);
}
