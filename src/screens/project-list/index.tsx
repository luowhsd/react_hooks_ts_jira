import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useDebounce, useDocumentTitle } from "hooks";
import styled from "@emotion/styled";
import { Typography, Row } from "antd";
import { useProjects } from "hooks/project";
import { useUser } from "hooks/user";
import { useProjectModal, useProjectSearchParam } from "./utils";
import { ButtonNoPadding } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParam();
  const { isLoading, isError, data: list, error, retry } = useProjects(
    useDebounce(param, 200)
  );
  const { data: users } = useUser();
  const { open } = useProjectModal();
  return (
    <Container>
      <Row justify={"space-between"}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPannel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPannel>
      {isError && (
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      )}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
