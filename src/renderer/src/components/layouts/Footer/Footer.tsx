import { Button, Code, createStyles, Flex, Footer as FooterWrapper } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

const useStyles = createStyles({
  button: {
    background: 'transparent',
    border: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      background: 'transparent',
      border: 'transparent'
    }
  }
});

export default function Footer() {
  const { classes } = useStyles();
  const appVersion = import.meta.env.VITE_APP_VERSION;
  return (
    <FooterWrapper height={28}>
      <Flex justify="space-between" align="center" mx={4}>
        <Button
          className={classes.button}
          leftIcon={<IconBrandGithub size={10} />}
          compact
          component="a"
          href="https://github.com/Gash21/i18n-editor"
          target="_blank"
          fz={10}
          bg="transparent"
          variant="subtle"
          m={2}
        >
          Let's Contribute
        </Button>
        <Code color="white" fz={10} bg="transparent">
          Version : {appVersion}
        </Code>
      </Flex>
    </FooterWrapper>
  );
}
