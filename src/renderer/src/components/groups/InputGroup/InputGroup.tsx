import { Flex, TextInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'

export default function InputGroup({ data, name, label }) {
  const { register } = useFormContext()
  if (typeof data !== 'string') {
    return <span></span>
  }

  return (
    <Flex direction="column" mx="sm">
      <TextInput
        icon="id"
        label={label}
        labelProps={{ my: 'sm' }}
        mb="sm"
        {...register(`id.${name}`)}
      />
      <TextInput icon="en" {...register(`en.${name}`)} />
    </Flex>
  )
}
