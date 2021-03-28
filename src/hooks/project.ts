import { useQuery } from "react-query";
import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};
