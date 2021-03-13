import React from "react";
import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      width={"100%"}
      visible={props.projectModalOpen}
    >
      <h1>project modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
