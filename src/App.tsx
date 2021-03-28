import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import "./App.css";
import { ErroryBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErroryBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErroryBoundary>
    </div>
  );
}

export default App;
