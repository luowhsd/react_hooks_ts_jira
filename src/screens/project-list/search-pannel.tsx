import { Input, Select, Form } from "antd";

const { Option } = Select;

export interface User {
  id: string;
  name: string;
  personId: number;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPannelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
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
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Option value={""}>负责人</Option>
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
