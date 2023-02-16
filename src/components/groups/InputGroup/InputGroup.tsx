import { ActionIcon, Button, Flex, Text, TextInput } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';

type IInputGroup = {
  data: Record<string, any>;
  name: string;
};

export default function InputGroup({ data, name}: IInputGroup) {
  const { register, setValue } = useFormContext();
  if (typeof data !== 'string') {
    return <span></span>;
  }

  return (
    <Flex direction="column" mx="sm">
      <TextInput
        icon="id"
        styles={{ label: { width: '100%' } }}
        labelProps={{ my: 'sm' }}
        mb="sm"
        rightSection={
          <ActionIcon
            p={0}
            onClick={() => {
              setValue(`id.${name}`, '');
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
              setValue(`en.${name}`, '');
            }}
          >
            <IconX size={12} />
          </ActionIcon>
        }
      />
    </Flex>
  );
}
