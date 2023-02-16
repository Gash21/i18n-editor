import {
  Flex,
  Grid,
  Code,
  Button,
  ActionIcon,
  Accordion,
  AccordionControlProps,
} from "@mantine/core";
import ModalConfirmDelete from "@renderer/components/forms/ModalConfirmDelete";
import EmptyEditor from "@renderer/components/groups/EmptyEditor";
import InputGroup from "@renderer/components/groups/InputGroup";
import TranslationPath from "@renderer/components/groups/TranslationPath";
import { useEditor } from "@renderer/contexts/EditorContext";
import { IconX } from "@tabler/icons-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useStyles } from "./EditorModule.styles";

type CustomAccordionProps = {
  onClick: () => void;
} & AccordionControlProps;

export default function EditorModule() {
  const { classes } = useStyles();
  const { setValue } = useFormContext();
  const {
    values,
    flattenValues,
    activeEditor,
    selected,
    setSelected,
    setActiveEditor,
    activePath,
    remove,
    keywords,
  } = useEditor();

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"namespace" | "item" | undefined>(
    "namespace"
  );
  const [filteredEditor, setFilteredEditor] = useState<Record<string, string>>(
    {}
  );
  const [selectedDelete, setSelectedDelete] = useState(selected);

  const toggleModal = useCallback(
    (
      type: "item" | "namespace" | undefined,
      selectedDel: string | undefined
    ) => {
      setOpenModal((p) => !p);
      setModalType(type);
      setSelectedDelete(selectedDel);
    },
    [openModal]
  );

  useEffect(() => {
    setValue("newItem", "");
  }, [flattenValues]);

  const setActiveData = (id: string | undefined) => {
    const newData = Object.keys(flattenValues).reduce(
      (res: Record<string, any>, key: string | undefined) => {
        if (key && id && key.indexOf(id) > -1) {
          if (typeof flattenValues[key] === "string") {
            res[key] = flattenValues[key];
          }
        }
        return res;
      },
      {}
    );
    setActiveEditor(newData);
  };

  useEffect(() => {
    setValue("namespace", selected);
    setActiveData(selected);
  }, [selected]);

  useEffect(() => {
    setActiveData(selected);
  }, [values]);

  useEffect(() => {
    setFilteredEditor(
      Object.keys(activeEditor).reduce((res: Record<string, any>, key) => {
        if (key && key.indexOf(keywords) > -1) {
          res[key] = activeEditor[key];
        }
        return res;
      }, {})
    );
  }, [keywords]);

  const AccordionControl = (props: CustomAccordionProps) => {
    const { onClick, ...AccordionProps } = props;
    return (
      <Flex justify="space-between" align="center">
        <Accordion.Control {...AccordionProps} />
        <Button
          leftIcon={<IconX size={12} />}
          size="sm"
          variant="outline"
          compact
          color="red"
          onClick={onClick}
          mr="sm"
        >
          Delete Item
        </Button>
      </Flex>
    );
  };

  return (
    <Fragment>
      <Grid mih="85vh" className={classes.wrapper}>
        <Grid.Col
          sm={4}
          md={3}
          style={{ borderRight: "1px #61636a solid", wordWrap: "break-word" }}
        >
          <Flex
            direction="row"
            justify="space-between"
            gap="md"
            align="center"
            mb="xl"
          >
            <Code w="100%">
              Path :{" "}
              {activePath ? `...${activePath?.slice(-(20 - 3))}` : `untitled`}
            </Code>
            <ActionIcon
              variant="outline"
              p={0}
              disabled={!selected}
              onClick={() => toggleModal("namespace", selected)}
              color="red"
            >
              <IconX size={10} />
            </ActionIcon>
          </Flex>
          <Flex direction="column">
            <TranslationPath
              selected={selected}
              onClick={setSelected}
              data={values}
              parent=""
            />
          </Flex>
        </Grid.Col>
        <Grid.Col sm={8} md={9} className={classes.wrapper}>
          <Flex direction={"column"} gap={"sm"}>
            <Accordion variant={"separated"} chevronPosition={"left"}>
              {Object.keys(!!keywords ? filteredEditor : activeEditor).map(
                (label) => (
                  <Accordion.Item key={label} value={label}>
                    <AccordionControl
                      onClick={() => toggleModal("item", label)}
                    >
                      {label}
                    </AccordionControl>
                    <Accordion.Panel>
                      <InputGroup data={activeEditor[label]} name={label} />
                    </Accordion.Panel>
                  </Accordion.Item>
                )
              )}
            </Accordion>
            {Object.keys(activeEditor).length === 0 && !activePath && (
              <EmptyEditor />
            )}
          </Flex>
        </Grid.Col>
      </Grid>
      <ModalConfirmDelete
        opened={openModal}
        selected={selectedDelete}
        toggleModal={() => toggleModal(modalType, selectedDelete)}
        onSubmit={() => remove(selectedDelete)}
        onCancel={() => toggleModal(modalType, selectedDelete)}
        type={modalType}
      />
    </Fragment>
  );
}
