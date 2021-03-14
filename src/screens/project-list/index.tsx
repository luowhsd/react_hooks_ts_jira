import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useDebounce, useDocumentTitle } from "hooks";
import styled from "@emotion/styled";
import { Typography, Row } from "antd";
import { useProjects } from "hooks/project";
import { useUser } from "hooks/user";
import { useProjectSearchParam } from "./utils";

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParam();
  const { isLoading, isError, data: list, error, retry } = useProjects(
    useDebounce(param, 200)
  );
  const { data: users } = useUser();

  return (
    <Container>
      <Row justify={"space-between"}>
        <h1>项目列表</h1>
        {props.projectButton}
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
        projectButton={props.projectButton}
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
