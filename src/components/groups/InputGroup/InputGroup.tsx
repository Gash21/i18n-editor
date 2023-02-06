import { ActionIcon, Button, Flex, Text, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";

type IInputGroup = {
  data: Record<string, any> | undefined;
  name: string;
  label: string;
  onDelete: () => void;
};

export default function InputGroup({
  data,
  name,
  label,
  onDelete,
}: IInputGroup) {
  const { register, setValue } = useFormContext();
  if (typeof data !== "string") {
    return <span></span>;
  }

  return (
    <Flex direction="column" mx="sm">
      <TextInput
        icon="id"
        styles={{ label: { width: "100%" } }}
        label={
          <Flex w="100%" direction="row" justify="space-between" align="center">
            <Text>{label}</Text>
            <Button
              leftIcon={<IconX size={12} />}
              size="sm"
              variant="outline"
              // sx={{ height: 24 }}
              compact
              color="red"
              onClick={onDelete}
            >
              Delete Item
            </Button>
          </Flex>
        }
        labelProps={{ my: "sm" }}
        mb="sm"
        rightSection={
          <ActionIcon
            p={0}
            onClick={() => {
              setValue(`id.${name}`, "");
            }}
          >
            <IconX size={12} />
          </ActionIcon>
        }
        {...register(`id.${name}`)}
      />
      <TextInput
        icon="en"
        {...register(`en.${name}`)}
        rightSection={
          <ActionIcon
            p={0}
            onClick={() => {
              setValue(`en.${name}`, "");
            }}
          >
            <IconX size={12} />
          </ActionIcon>
        }
      />
    </Flex>
  );
}
