import { useState } from "react";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useDebounce } from "hooks";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "hooks/project";
import { useUser } from "hooks/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const { isLoading, isError, data: list, error } = useProjects(debounceParam);
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

const Container = styled.div`
  padding: 3.2rem;
`;
