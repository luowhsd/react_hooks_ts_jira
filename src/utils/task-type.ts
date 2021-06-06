import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "utils/http";

export const useTaskTypes = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
