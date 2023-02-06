import { createStyles, Flex, Text, UnstyledButton } from '@mantine/core'
import { useEditor } from '@renderer/contexts/EditorContext'
import { IconFolder, IconFolderPlus } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    margin: 24,
    padding: '1rem',
    width: '34rem',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.01)'
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    margin: '1rem'
  },
  description: {
    marginLeft: '1rem',
    textAlign: 'left'
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%'
  }
}))
export default function EmptyEditor() {
  const { open } = useEditor()
  const items = [
    {
      title: 'Create New Project',
      description: `Let's start from scratch, please choose folder to save your file`,
      icon: <IconFolderPlus size={32} />,
      action: () => open()
    },
    {
      title: 'Open Project',
      description: ` Open and edit your existing translation project `,
      icon: <IconFolder size={32} />,
      action: () => open()
    }
  ]

  const { classes } = useStyles()
  return (
    <Flex direction="column" className={classes.container}>
      {items.map((item) => {
        return (
          <UnstyledButton key={item.title} className={classes.item} onClick={item.action}>
            <div className={classes.icon}>{item.icon}</div>
            <div className={classes.description}>
              <Text fw={700} size={16} mt={4}>
                {item.title}
              </Text>
              <Text size={12} mt={4}>
                {item.description}
              </Text>
            </div>
          </UnstyledButton>
        )
      })}
    </Flex>
  )
}
