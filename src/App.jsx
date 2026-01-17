import React from "react";
import { useMsal } from "@azure/msal-react";
import LoginButton from "./LoginButton";
import ApiCaller from "./ApiCaller";

function App() {
  const { accounts } = useMsal();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>TML CB Financing</h1>

      {accounts.length > 0 ? (
        <div>
          <p>Logged in as:</p>
          <strong>{accounts[0].username}</strong>
          <ApiCaller />
        </div>
      ) : (
        <>
          <LoginButton />          
        </>
      )}
    </div>
  );
}

export default App;
