import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
export const useProjectSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const projectsParam = {
    ...param,
    personId: Number(param.personId) || undefined,
  };
  return [useMemo(() => projectsParam, [param]), setParam] as const;
};
