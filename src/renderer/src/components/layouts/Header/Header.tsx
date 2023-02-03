import {
  Button,
  Container,
  createStyles,
  Group,
  Header as HeaderWrapper,
  Image
} from '@mantine/core'
import LogoTop from '@renderer/assets/logo-top.svg'
import { IconArrowBack, IconDeviceFloppy, IconDisc } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-location'

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

export default function Header() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  return (
    <HeaderWrapper height={60} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Image src={LogoTop} height={36} />
        </Group>
        <Group spacing={5} className={classes.links}></Group>
        <Group>
          <Button sx={{ height: 30 }} onClick={() => navigate({ to: '/home', replace: true })}>
            <IconArrowBack />
          </Button>
          <Button sx={{ height: 30 }} type="submit">
            <IconDeviceFloppy />
          </Button>
        </Group>
      </Container>
    </HeaderWrapper>
  )
}
