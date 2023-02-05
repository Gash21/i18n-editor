import {
  Button,
  Container,
  createStyles,
  Group,
  Header as HeaderWrapper,
  Image,
  Menu,
  Text,
  Tooltip,
  useMantineTheme
} from '@mantine/core'
import LogoTop from '@renderer/assets/logo-top.svg'
import { useEditor } from '@renderer/contexts/EditorContext'
import { checkOS } from '@renderer/utils/devices'
import {
  IconChevronDown,
  IconDeviceFloppy,
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

export default function Header({ openSegment, openItem }) {
  const theme = useMantineTheme()
  const { selected } = useEditor()
  const { classes } = useStyles()

  const altText = checkOS() !== 'macos' ? 'alt' : '⌥'
  return (
    <HeaderWrapper height={60} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Image src={LogoTop} height={36} />
        </Group>
        <Group spacing={5} className={classes.links}></Group>
        <Group>
          <Menu transition="pop-top-right" position="top-end" width={220} withinPortal>
            <Menu.Target>
              <Button
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
                onClick={openSegment}
                icon={<IconPackage size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                rightSection={
                  <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                    {altText} + P
                  </Text>
                }
              >
                Segment
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
          <Button sx={{ height: 30 }} type="submit" leftIcon={<IconDeviceFloppy size={16} />}>
            Save
          </Button>
        </Group>
      </Container>
    </HeaderWrapper>
  )
}
