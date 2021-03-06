import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(params || {}) }),
    [params, client]
  );
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [fetchProjects, run]);
  return result;
};
