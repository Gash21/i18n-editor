import {
  Button,
  Checkbox,
  Code,
  Divider,
  Flex,
  Group,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { dialog } from "@tauri-apps/api";
import { createProject } from "@renderer/utils/filesystem";
import { useEditor } from "@renderer/contexts/EditorContext";
import { useConfig } from "@renderer/contexts/ConfigContext";

type IModalProps = {
  opened: boolean;
  toggleModal: () => void;
};

export default function ModalConfiguration({
  opened,
  toggleModal,
}: IModalProps) {
  const { exportConfig, setConfig } = useConfig();

  const changeValue = (key: "json" | "minify" | "flatten") => {
    setConfig({ exportConfig: { ...exportConfig, [key]: !exportConfig[key] } });
  };

  return (
    <Modal
      title="Editor Configuration"
      opened={opened}
      centered
      onClose={toggleModal}
    >
      <Divider my="sm" />
      <Text fz="sm" c="dimmed" mb="sm">
        JSON Export Configuration
      </Text>
      <Checkbox
        name="default"
        value="checked"
        checked={exportConfig.flatten}
        label="Flatten JSON Result (e.g. common.button.text)"
        onChange={() => changeValue("flatten")}
      />
      <Checkbox
        mt="lg"
        name="default"
        value="checked"
        checked={exportConfig.minify}
        label="Minify JSON Result"
        onChange={() => changeValue("minify")}
      />
    </Modal>
  );
}
