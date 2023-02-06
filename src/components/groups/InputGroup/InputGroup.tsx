import { Flex, TextInput } from "@mantine/core";
import { useFormContext } from "react-hook-form";

type IInputProps = {
  data: Record<string, any>;
  name: string;
  label: string;
};
export default function InputGroup({ data, name, label }: IInputProps) {
  const { register } = useFormContext();
  if (typeof data !== "string") {
    return <span></span>;
  }

  return (
    <Flex direction="column" mx="sm">
      <TextInput
        icon="id"
        label={label}
        labelProps={{ my: "sm" }}
        mb="sm"
        {...register(`id.${name}`)}
      />
      <TextInput icon="en" {...register(`en.${name}`)} />
    </Flex>
  );
}
