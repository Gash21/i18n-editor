import {
  Button,
  Container,
  createStyles,
  Group,
  Header as HeaderWrapper,
  Menu,
  Text,
  useMantineTheme
} from '@mantine/core'
import { useEditor } from '@renderer/contexts/EditorContext'
import { checkOS } from '@renderer/utils/devices'
import {
  IconChevronDown,
  IconDeviceFloppy,
  IconLanguage,
  IconPackage,
  IconPlus,
  IconSquareCheck
} from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  inner: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
  },

  linkLabel: {
    marginRight: 5
  }
}))

type IHeaderProps = {
  openNamespace: () => void
  openItem: () => void
}

export default function Header({ openNamespace, openItem }: IHeaderProps) {
  const theme = useMantineTheme()
  const { selected, activePath } = useEditor()
  const { classes } = useStyles()

  const altText = checkOS() !== 'macos' ? 'alt' : '⌥'
  return (
    <HeaderWrapper height={60} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <IconLanguage /> <Text>i18n Editor</Text>
        </Group>
        <Group spacing={5} className={classes.links}></Group>
        <Group>
          <Menu transition="pop-top-right" position="top-end" width={220} withinPortal>
            <Menu.Target>
              <Button
                disabled={!activePath}
                leftIcon={<IconPlus size={18} stroke={1.5} />}
                rightIcon={<IconChevronDown size={18} stroke={1.5} />}
                sx={{ height: 30 }}
                pr={12}
              >
                Tambah Baru
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                sx={{ height: 30 }}
                onClick={openNamespace}
                disabled={activePath === ''}
                icon={<IconPackage size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                rightSection={
                  <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                    {altText} + P
                  </Text>
                }
              >
                Namespace
              </Menu.Item>
              <Menu.Item
                sx={{ height: 30 }}
                onClick={openItem}
                disabled={selected === ''}
                icon={<IconSquareCheck size={16} color={theme.colors.pink[6]} stroke={1.5} />}
                rightSection={
                  <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                    {altText} + T
                  </Text>
                }
              >
                Item
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Button
            disabled={!activePath}
            sx={{ height: 30 }}
            type="submit"
            leftIcon={<IconDeviceFloppy size={16} />}
          >
            Save
          </Button>
        </Group>
      </Container>
    </HeaderWrapper>
  )
}
