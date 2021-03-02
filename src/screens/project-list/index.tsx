import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useDebounce, useDocumentTitle } from "hooks";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "hooks/project";
import { useUser } from "hooks/user";
import { useProjectSearchParam } from "./utils";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParam();
  const { isLoading, isError, data: list, error } = useProjects(
    useDebounce(param, 200)
  );
  const { data: users } = useUser();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPannel>
      {isError && (
        <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
      )}
      <List
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
