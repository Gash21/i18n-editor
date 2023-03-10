import { Button, Divider, Group, Modal, TextInput } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { useEditor } from "@renderer/contexts/EditorContext";

type IModalProps = {
  opened: boolean;
  toggleModal: () => void;
};

export default function NamespaceModal({ opened, toggleModal }: IModalProps) {
  const { watch, setValue, register } = useFormContext();
  const { add } = useEditor();

  const normalizeValue = (key: string, value: string) => {
    const regex = /[^a-zA-Z0-9.\-\_]*$/g;
    setValue(
      key,
      value.toLowerCase().replace(/\.\.+/g, ".").replace(regex, "")
    );
  };

  const onSave = () => {
    const key = watch("namespace");
    const result = key
      .toLowerCase()
      .replace(/^\.+|\.\.+|[^a-zA-Z0-9.\-\_]+$|\.$/g, "");
    if (key) {
      add(result, {});
    }
    toggleModal();
  };
  return (
    <Modal title="Add Namespace" opened={opened} centered onClose={toggleModal}>
      <Divider mb="sm" />
      <TextInput
        style={{ textTransform: "lowercase" }}
        {...register("namespace")}
        onChange={({ target }) => normalizeValue("namespace", target.value)}
      />
      <Group mt="xl">
        <Button variant="outline" onClick={onSave}>
          Create Namespace
        </Button>
      </Group>
    </Modal>
  );
}
