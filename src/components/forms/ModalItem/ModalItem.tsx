import {
  Button,
  Code,
  Divider,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { useEditor } from "@renderer/contexts/EditorContext";
import { useCallback } from "react";

type IModalProps = {
  opened: boolean;
  toggleModal: () => void;
};

export default function ItemModal({ opened, toggleModal }: IModalProps) {
  const { watch, setValue } = useFormContext();
  const { selected, add } = useEditor();

  const normalizeValue = (key: string, value: string) => {
    const regex = /[^a-zA-Z0-9\-\_]*$/g;
    setValue(key, value.toLowerCase().replace(regex, ""));
  };

  const onSave = useCallback(() => {
    const value = watch("newItem");
    if (value) {
      const newValue = `${selected}.${value}`;
      add(newValue, "");
    }
    toggleModal();
  }, [selected]);

  return (
    <Modal title="Add Item Text" opened={opened} centered onClose={toggleModal}>
      <Divider mb="sm" />
      <Text mb="xs">Menambahkan translation text untuk segment</Text>
      <Code>{selected}</Code>
      <Divider my="sm" />
      <TextInput
        label="Text Key"
        value={watch("newItem")}
        placeholder="e.g label, warning, default"
        labelProps={{ mb: "sm" }}
        onChange={({ target }) => normalizeValue("newItem", target.value)}
      />
      <Group mt="xl">
        <Button variant="outline" onClick={onSave}>
          Buat Item
        </Button>
      </Group>
    </Modal>
  );
}
