import { useMemo } from "react";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "utils/http";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "utils/use-optimistic-options";
import { Project } from "./list";
export const useProjectSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(() => {
      return {
        ...param,
        personId: Number(param.personId) || undefined,
      };
    }, [param]),
    setParam,
  ] as const;
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParam();
  return ["projects", params];
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectModalOpen({ projectCreate: true });

  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
