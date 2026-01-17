import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

function LoginButton() {
  const { instance } = useMsal();

  return (
    <button onClick={() => instance.loginRedirect(loginRequest)}>
      Log In with Entra External ID
    </button>
  );
}

export default LoginButton;
