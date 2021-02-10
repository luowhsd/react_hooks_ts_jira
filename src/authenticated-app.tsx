import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};
