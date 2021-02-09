import { FormEvent } from "react";

export const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username"></label>
        <input id="username" type="text"></input>
      </div>
      <div>
        <label htmlFor="password"></label>
        <input id="password" type="password"></input>
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
