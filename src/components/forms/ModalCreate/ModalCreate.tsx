import {
  Button,
  Checkbox,
  Code,
  Divider,
  Flex,
  Group,
  Modal,
  Text,
} from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { dialog } from "@tauri-apps/api";
import { createProject } from "@renderer/utils/filesystem";
import { useEditor } from "@renderer/contexts/EditorContext";

type IModalProps = {
  opened: boolean;
  toggleModal: () => void;
};

export default function ModalCreate({ opened, toggleModal }: IModalProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { open } = useEditor();
  const [isDefault, setIsDefault] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);

  const openFolder = async () => {
    try {
      const path = await dialog.open({
        directory: true,
        multiple: false,
        title: "Choose folder",
      });
      if (!Array.isArray(path)) {
        setSelected(path);
      }
    } catch (err) {}
  };

  const onDefaultChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsDefault((p) => !p);
  };
  const onCreateFolder = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCreateFolder((p) => !p);
  };

  const onCreate = async () => {
    const isConfirming = await dialog.confirm(
      `Are you sure to create new project?\n Any existing json will be overwrited
      \n\nIf you already received file from developer, please open your project instead`,
      { title: "Create new project", type: "warning" }
    );
    if (isConfirming) {
      try {
        const newPath = await createProject(selected, isDefault, createFolder);
        toggleModal();
        await open(newPath);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <Modal
      title="Create New Project"
      opened={opened}
      centered
      onClose={toggleModal}
    >
      <Divider mb="sm" />
      <Flex mb="xl" direction="row" justify="space-between">
        <Text size="sm" mb="xs">
          Project Root Folder
        </Text>
        <Button compact onClick={openFolder}>
          Open
        </Button>
      </Flex>
      <Code>{selected || "No selected folder"}</Code>
      <Divider my="sm" />
      <Text mb="md" size="sm">
        Configuration :
      </Text>
      <Checkbox
        name="default"
        mb="md"
        value="checked"
        checked={isDefault}
        label="Add default namespace & item"
        onChange={onDefaultChange}
      />
      <Checkbox
        name="default"
        value="checked"
        checked={createFolder}
        label="Use folder resources (Will be created if not exists)"
        onChange={onCreateFolder}
      />
      <Group mt="xl">
        <Button
          disabled={!selected}
          variant="outline"
          fullWidth
          onClick={onCreate}
        >
          Create New Project
        </Button>
      </Group>
    </Modal>
  );
}
