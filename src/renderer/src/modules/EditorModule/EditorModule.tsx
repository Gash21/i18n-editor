import { Flex, Grid, Code, Button, ActionIcon, Group, Text } from '@mantine/core';
import ModalConfirmDelete from '@renderer/components/forms/ModalConfirmDelete';
import EmptyEditor from '@renderer/components/groups/EmptyEditor';
import InputGroup from '@renderer/components/groups/InputGroup';
import TranslationPath from '@renderer/components/groups/TranslationPath';
import { useEditor } from '@renderer/contexts/EditorContext';
import { IconX } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function EditorModule() {
  const { setValue } = useFormContext();
  const {
    values,
    flattenValues,
    activeEditor,
    selected,
    setSelected,
    setActiveEditor,
    activePath,
    remove
  } = useEditor();

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<'namespace' | 'item' | undefined>('namespace');
  const [selectedDelete, setSelectedDelete] = useState(selected);

  const toggleModal = useCallback(
    (type: 'item' | 'namespace' | undefined, selectedDel: string | undefined) => {
      setOpenModal((p) => !p);
      setModalType(type);
      setSelectedDelete(selectedDel);
    },
    [openModal]
  );

  useEffect(() => {
    setValue('newItem', '');
  }, [flattenValues]);

  const setActiveData = (id: string | undefined) => {
    const newData = Object.keys(flattenValues).reduce(
      (res: Record<string, any>, key: string | undefined) => {
        if (key && id && key.indexOf(id) > -1) {
          if (typeof flattenValues[key] === 'string') {
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
    setValue('namespace', selected);
    setActiveData(selected);
  }, [selected]);

  useEffect(() => {
    setActiveData(selected);
    console.log(values);
  }, [values]);

  return (
    <>
      <Grid mih="85vh">
        <Grid.Col
          sm={4}
          md={3}
          style={{ borderRight: '1px #61636a solid', wordWrap: 'break-word' }}
        >
          <Flex direction="row" justify="space-between" gap="md" align="center" mb="xl">
            <Code w="100%">
              Path : {activePath ? `...${activePath?.slice(-(20 - 3))}` : `untitled`}
            </Code>
            <ActionIcon
              variant="outline"
              p={0}
              disabled={!selected}
              onClick={() => toggleModal('namespace', selected)}
              color="red"
            >
              <IconX size={10} />
            </ActionIcon>
          </Flex>
          <Flex direction="column">
            <TranslationPath selected={selected} onClick={setSelected} data={values} parent="" />
          </Flex>
        </Grid.Col>
        <Grid.Col sm={8} md={9}>
          {Object.keys(activeEditor).map((label) => (
            <InputGroup
              key={label}
              data={activeEditor[label]}
              name={label}
              label={label}
              onDelete={() => toggleModal('item', label)}
            />
          ))}
          {Object.keys(activeEditor).length === 0 && !activePath && <EmptyEditor />}
        </Grid.Col>
      </Grid>
      <ModalConfirmDelete
        opened={openModal}
        selected={selectedDelete}
        toggleModal={() => toggleModal(modalType, selectedDelete)}
        onSubmit={() => remove(selected)}
        onCancel={() => toggleModal(modalType, selectedDelete)}
        type={modalType}
      />
    </>
  );
}
