import { useState, useEffect } from "react";
import { cleanObject } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useMount, useDebounce } from "hooks";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPannel>
      <List users={users} list={list}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
