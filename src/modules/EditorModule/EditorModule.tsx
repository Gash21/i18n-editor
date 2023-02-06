import { Flex, Grid, Code } from "@mantine/core";
import EmptyEditor from "@renderer/components/groups/EmptyEditor";
import InputGroup from "@renderer/components/groups/InputGroup";
import TranslationPath from "@renderer/components/groups/TranslationPath";
import { useEditor } from "@renderer/contexts/EditorContext";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function EditorModule() {
  const { setValue } = useFormContext();
  const {
    values,
    flattenValues,
    activeEditor,
    selected,
    setSelected,
    setActiveEditor,
    activePath,
  } = useEditor();

  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    setValue("newItem", "");
  }, [flattenValues]);

  const setActiveData = (id: string | undefined) => {
    const newData = Object.keys(flattenValues).reduce(
      (res: Record<string, any>, key: string | undefined) => {
        if (key && id && key.indexOf(id) > -1) {
          if (typeof flattenValues[key] === "string") {
            res[key] = flattenValues[key];
          }
        }
        return res;
      },
      {}
    );
    setActiveEditor(newData);
  };

  useEffect(() => {
    setValue("newSegment", selected);
    setActiveData(selected);
  }, [selected]);

  return (
    <Grid mih="85vh">
      <Grid.Col
        sm={4}
        md={3}
        style={{ borderRight: "1px #61636a solid", wordWrap: "break-word" }}
      >
        {activePath ? (
          <Code w="100%" mb="xl">
            Path : {`...${activePath?.slice(-(20 - 3))}`}
          </Code>
        ) : (
          <Code w="100%" mb="xl">
            Path : {`untitled`}
          </Code>
        )}
        <Flex mt="sm" direction="column">
          <TranslationPath
            selected={selected}
            onClick={setSelected}
            data={values}
            parent=""
          />
        </Flex>
      </Grid.Col>
      <Grid.Col sm={8} md={9}>
        {Object.keys(activeEditor).map((label) => (
          <InputGroup
            key={label}
            data={activeEditor[label]}
            name={label}
            label={label}
          />
        ))}
        {Object.keys(activeEditor).length === 0 && !activePath && (
          <EmptyEditor />
        )}
      </Grid.Col>
    </Grid>
  );
}
