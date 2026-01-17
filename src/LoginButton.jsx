import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

function LoginButton() {
  const { instance } = useMsal();

  const login = async () => {
    await instance.loginRedirect(loginRequest);
  };

  return <button onClick={login}>Log in</button>;
}

export default LoginButton;
