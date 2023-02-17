import { flattenObject, unflattenObject } from "@renderer/utils/object";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { EditorContext } from "./useEditor";
import { noop } from "@mantine/utils";
import { useDebouncedValue } from "@mantine/hooks";
import { openFolder, saveFolder } from "@renderer/utils/filesystem";
import { dialog } from "@tauri-apps/api";
import { useConfig } from "../ConfigContext";

type IEditorProvProps = {
  defaultValues: {};
  defaultActivePath?: string;
  defaultSelected?: string;
  defaultActiveEditor?: {};
  defaultKeywords?: string;
  children: ReactNode;
};

export default function EditorProvider({
  defaultValues,
  children,
  defaultActivePath = "",
  defaultSelected = "",
  defaultActiveEditor = {},
  defaultKeywords = "",
}: IEditorProvProps) {
  const [values, setValues] = useState<{}>(defaultValues);
  const { exportConfig } = useConfig();
  const [formValues, setFormValues] = useState<{}>({
    id: defaultValues,
    en: defaultValues,
  });
  const [activePath, setActivePath] = useState(defaultActivePath);
  const [selected, setSelected] = useState(defaultSelected);
  const [activeEditor, setActiveEditor] = useState(defaultActiveEditor);
  const [flattenValues, setFlattenValues] = useState(
    flattenObject(defaultValues)
  );
  const [keywords, setKeywords] = useState<string>(defaultKeywords);
  const [debouncedKeywords] = useDebouncedValue(keywords, 500);

  const add = (key: string, value = {}) => {
    setFlattenValues((fV: {}) => ({ ...fV, [key]: value }));
  };

  const handleKeyPress = useCallback(
    async (event: KeyboardEvent) => {
      const { keyCode, metaKey, ctrlKey, altKey, shiftKey } = event;
      switch (keyCode) {
        case 79:
          if (metaKey || ctrlKey) {
            await open();
          }
          break;
        case 83:
          if (altKey) {
            noop();
          }
          if (metaKey || ctrlKey) {
            if (shiftKey) {
              await saveAs(formValues);
            } else {
              await save(formValues);
            }
          }
          break;
        case 73:
          if (altKey) {
            noop();
          }
          break;
      }
    },
    [values, formValues, exportConfig]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const remove = (key: string | undefined) => {
    if (key) {
      const newValues = { ...flattenValues };
      const formValuesFlat = flattenObject(formValues);
      Object.keys(newValues).forEach((k) => {
        if (k.indexOf(key) > -1) {
          delete newValues[k];
        }
      });
      Object.keys(formValuesFlat).forEach((k) => {
        if (k.indexOf(key) > -1) {
          delete formValuesFlat[k];
        }
      });
      setFlattenValues(newValues);
      setFormValues(unflattenObject(formValuesFlat));
    }
  };

  useEffect(() => {
    const unflattenObj = unflattenObject(flattenValues);
    setValues(unflattenObj);
  }, [flattenValues]);

  const prepareData = (data: Record<string, any> | undefined) => {
    if (data) {
      const newData = { ...data };

      console.log(exportConfig.flatten);

      if (exportConfig.flatten) {
        newData.id = flattenObject(newData.id);
        newData.en = flattenObject(newData.en);
      }
      if (exportConfig.minify) {
        newData.id = JSON.stringify(newData.id);
        newData.en = JSON.stringify(newData.en);
      } else {
        newData.id = JSON.stringify(newData.id, null, 2);
        newData.en = JSON.stringify(newData.en, null, 2);
      }
      return newData;
    }
    return { id: {}, en: {} };
  };

  const save = async (data: Record<string, any> | undefined) => {
    const newData = prepareData(data);
    await saveFolder(newData, activePath);
    alert("Saved successfully");
  };

  const saveAs = async (data: Record<string, any> | undefined) => {
    const path = await dialog.save({ title: "Save As" });
    const newData = prepareData(data);
    if (path) {
      saveFolder(newData, path);
    }
  };

  const open = async (path?: string | undefined) => {
    let newPath: string | null | string[] = "";
    if (!path) {
      newPath = await dialog.open({
        directory: true,
        multiple: false,
        title: "Choose folder",
      });
    } else {
      newPath = path;
    }

    if (newPath && !Array.isArray(newPath)) {
      const res = await openFolder(newPath);
      if (res) {
        setFormValues({ id: res.id, en: res.en });
        setFlattenValues(flattenObject(res.values));
        setValues(res.values);
        setActivePath(res.path);
        setSelected("");
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      values,
      flattenValues,
      activePath,
      activeEditor,
      selected,
      formValues,
      keywords: debouncedKeywords,
      add,
      remove,
      setActivePath,
      setActiveEditor,
      setSelected,
      setFormValues,
      setKeywords,
      save,
      saveAs,
      open,
    }),
    [
      values,
      flattenValues,
      activePath,
      activeEditor,
      selected,
      formValues,
      debouncedKeywords,
    ]
  );

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
}
