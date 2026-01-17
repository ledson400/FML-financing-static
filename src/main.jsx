import React from "react";
import ReactDOM from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import App from "./App";

const msalInstance = new PublicClientApplication(msalConfig);

// IMPORTANT: initialize + handle redirect
msalInstance.initialize().then(() => {
  msalInstance.handleRedirectPromise().catch((error) => {
    console.error("Redirect error:", error);
  });

  ReactDOM.createRoot(document.getElementById("root")).render(
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
});
