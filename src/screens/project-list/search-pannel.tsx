import { Input, Select, Form } from "antd";
import { IdSelect } from "components/id-select";
import { UseSelect } from "components/user-select";
import { Project } from "./list";

const { Option } = Select;

export interface User {
  id: number;
  name: string;
  personId: number;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPannelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPannelProps["param"]) => void;
}
export const SearchPannel = ({ users, param, setParam }: SearchPannelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder={"项目名"}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        ></Input>
      </Form.Item>
      <Form.Item>
        <UseSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
