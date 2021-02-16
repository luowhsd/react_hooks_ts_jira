import { useState, useEffect } from "react";
import { cleanObject } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { useMount, useDebounce } from "hooks";
import { useHttp } from "utils/http";

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
  }, [debounceParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <div>
      <SearchPannel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPannel>
      <List users={users} list={list}></List>
    </div>
  );
};
