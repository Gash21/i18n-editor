import { Outlet } from "@tanstack/react-location";
import Header from "@renderer/components/layouts/Header";
import { AppShell } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import { EditorProvider, useEditor } from "@renderer/contexts/EditorContext";
import ModalNamespace from "@renderer/components/forms/ModalNamespace";
import ModalItem from "@renderer/components/forms/ModalItem";
import { useCallback, useEffect, useState } from "react";
import Footer from "@renderer/components/layouts/Footer";
import ModalConfiguration from "@renderer/components/forms/ModalConfiguration";

export default function EditorLayout() {
  return (
    <EditorProvider defaultValues={{}}>
      <FormLayout />
    </EditorProvider>
  );
}

const FormLayout = () => {
  const methods = useForm({
    defaultValues: { namespace: "", newItem: "" },
  });
  const { save, formValues } = useEditor();
  const [openNamespace, setOpenNamespace] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);
  const toggleConfig = useCallback(() => {
    setOpenConfig((p) => !p);
  }, [openConfig]);

  const toggleNamespace = useCallback(() => {
    setOpenNamespace((p) => !p);
  }, [openNamespace]);

  useEffect(() => {
    methods.reset(formValues);
  }, [formValues]);

  const toggleItem = useCallback(() => {
    setOpenItem((p) => !p);
  }, [openItem]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(save)}>
        <AppShell
          footer={<Footer />}
          header={
            <Header
              openNamespace={toggleNamespace}
              openItem={toggleItem}
              openConfig={toggleConfig}
            />
          }
        >
          <Outlet />
          <ModalNamespace
            opened={openNamespace}
            toggleModal={toggleNamespace}
          />
          <ModalItem opened={openItem} toggleModal={toggleItem} />
          <ModalConfiguration opened={openConfig} toggleModal={toggleConfig} />
        </AppShell>
      </form>
    </FormProvider>
  );
};
