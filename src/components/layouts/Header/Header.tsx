import {
  Button,
  Container,
  createStyles,
  Group,
  Header as HeaderWrapper,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useEditor } from "@renderer/contexts/EditorContext";
import { checkOS } from "@renderer/utils/devices";
import {
  IconChevronDown,
  IconDeviceFloppy,
  IconFolder,
  IconLanguage,
  IconPackage,
  IconPlus,
  IconSquareCheck,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const useStyles = createStyles((theme) => ({
  inner: {
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

type IHeaderProps = {
  openNamespace: () => void;
  openItem: () => void;
};

export default function Header({ openNamespace, openItem }: IHeaderProps) {
  const theme = useMantineTheme();
  const { watch } = useFormContext();
  const { selected, activePath, open, save, saveAs, setFormValues } =
    useEditor();
  const { classes } = useStyles();

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && name !== "namespace" && name !== "newItem") {
        setFormValues({ id: value.id, en: value.en });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const altText = checkOS() !== "macos" ? "alt" : "⌥";
  const ctrlText = checkOS() !== "macos" ? "ctrl" : "⌘";

  const onSave = (isSaveAs: boolean | undefined = false) => {
    if (saveAs) {
      saveAs(watch());
    } else {
      save(watch());
    }
  };
  return (
    <HeaderWrapper height={60} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <IconLanguage /> <Text>i18n Editor</Text>
        </Group>
        <Group spacing={5} className={classes.links}></Group>
        <Group>
          <Menu
            transition="pop-top-right"
            position="top-end"
            width={220}
            withinPortal
          >
            <Menu.Target>
              <Button
                disabled={!activePath}
                leftIcon={<IconPlus size={18} stroke={1.5} />}
                rightIcon={<IconChevronDown size={18} stroke={1.5} />}
                sx={{ height: 30 }}
                pr={12}
              >
                Add
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                sx={{ height: 30 }}
                onClick={openNamespace}
                disabled={activePath === ""}
                icon={
                  <IconPackage
                    size={16}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
                rightSection={
                  <Text
                    size="xs"
                    transform="uppercase"
                    weight={700}
                    color="dimmed"
                  >
                    {altText} + P
                  </Text>
                }
              >
                Namespace
              </Menu.Item>
              <Menu.Item
                sx={{ height: 30 }}
                onClick={openItem}
                disabled={selected === ""}
                icon={
                  <IconSquareCheck
                    size={16}
                    color={theme.colors.pink[6]}
                    stroke={1.5}
                  />
                }
                rightSection={
                  <Text
                    size="xs"
                    transform="uppercase"
                    weight={700}
                    color="dimmed"
                  >
                    {altText} + T
                  </Text>
                }
              >
                Item
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Button
            variant="outline"
            disabled={!activePath}
            sx={{ height: 30 }}
            onClick={() => open()}
            type="button"
            leftIcon={<IconFolder size={16} />}
          >
            Open Folder
          </Button>
          <Menu
            transition="pop-top-right"
            position="top-end"
            width={220}
            withinPortal
          >
            <Menu.Target>
              <Button
                disabled={!activePath}
                variant="outline"
                leftIcon={<IconDeviceFloppy size={16} stroke={1.5} />}
                rightIcon={<IconChevronDown size={18} stroke={1.5} />}
                sx={{ height: 30 }}
                pr={12}
              >
                Save
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                sx={{ height: 30 }}
                onClick={() => onSave()}
                type="submit"
                icon={
                  <IconDeviceFloppy
                    size={16}
                    color={theme.colors.green[6]}
                    stroke={1.5}
                  />
                }
                rightSection={
                  <Text
                    size="xs"
                    transform="uppercase"
                    weight={700}
                    color="dimmed"
                  >
                    {ctrlText} + S
                  </Text>
                }
              >
                Save
              </Menu.Item>
              <Menu.Item
                onClick={() => onSave(true)}
                sx={{ height: 30 }}
                icon={
                  <IconDeviceFloppy
                    size={16}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
                rightSection={
                  <Text
                    size="xs"
                    transform="uppercase"
                    weight={700}
                    color="dimmed"
                  >
                    {ctrlText} + Shift + S
                  </Text>
                }
              >
                Save As
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </HeaderWrapper>
  );
}
