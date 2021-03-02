import { useUser } from "hooks/user";
import { IdSelect } from "./id-select";

export const UseSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUser();
  return <IdSelect options={users || []} {...props} />;
};
