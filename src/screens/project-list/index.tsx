import { useState, useEffect } from "react";
import { cleanObject } from "utils";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import * as qs from "qs";
import { useMount, useDebounce } from "hooks";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 200);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
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
