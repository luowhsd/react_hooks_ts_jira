import React from "react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} width={"100%"} visible={projectModalOpen}>
      <h1>project modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
