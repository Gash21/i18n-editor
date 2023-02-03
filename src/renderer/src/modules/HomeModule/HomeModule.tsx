import { Card, createStyles, Flex, Text, UnstyledButton } from '@mantine/core'
import { IconFolder, IconNewSection } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-location'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: '#565b75',
    height: '80%',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 300,
    minWidth: 300,
    backgroundColor: '#2f3241',
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)'
    }
  },
  container: {
    height: '100vh'
  }
}))

export default function HomeModule() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  return (
    <Flex justify="center" align="center" className={classes.container}>
      <Card withBorder radius="md" className={classes.card}>
        <UnstyledButton onClick={() => navigate({ to: '/new' })} className={classes.item}>
          <IconNewSection size={70} color="violet" />
          <Text size="lg" mt={7} my="xl">
            Buat Configurasi Baru
          </Text>
        </UnstyledButton>
        <UnstyledButton onClick={() => navigate({ to: '/open' })} className={classes.item}>
          <IconFolder size={70} color="violet" />
          <Text size="lg" mt={7} my="xl">
            Buka Folder
          </Text>
        </UnstyledButton>
      </Card>
    </Flex>
  )
}
