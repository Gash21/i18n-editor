import { flattenObject, unflattenObject } from "@renderer/utils/object";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { EditorContext } from "./useEditor";
import { noop } from "@mantine/utils";
import { openFolder, saveFolder } from "@renderer/utils/filesystem";
import { dialog } from "@tauri-apps/api";

type IEditorProvProps = {
  defaultValues: {};
  defaultActivePath?: string;
  defaultSelected?: string;
  defaultActiveEditor?: {};
  children: ReactNode;
};

export default function EditorProvider({
  defaultValues,
  children,
  defaultActivePath = "",
  defaultSelected = "",
  defaultActiveEditor = {},
}: IEditorProvProps) {
  const [values, setValues] = useState<{}>(defaultValues);
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
    [values, formValues]
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
      Object.keys(newValues).forEach((k) => {
        if (k.indexOf(key) > -1) {
          delete newValues[k];
        }
      });
      setFlattenValues(newValues);
    }
  };

  useEffect(() => {
    const unflattenObj = unflattenObject(flattenValues);
    setValues(unflattenObj);
  }, [flattenValues]);

  const save = async (data: Record<string, any> | undefined) => {
    await saveFolder(data, activePath);
    alert("Saved successfully");
  };

  const saveAs = async (data: Record<string, any> | undefined) => {
    // await window.electron.ipcRenderer.invoke('save-as-file', { id: data.id, en: data.en })
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
        const flatten = flattenObject(res.values);
        const unflatten = unflattenObject(flatten);
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
      add,
      remove,
      setActivePath,
      setActiveEditor,
      setSelected,
      setFormValues,
      save,
      saveAs,
      open,
    }),
    [values, flattenValues, activePath, activeEditor, selected, formValues]
  );

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
}
