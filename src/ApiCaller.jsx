import React from "react";
import { useMsal } from "@azure/msal-react";

export default function ApiCaller() {
  const { instance, accounts } = useMsal();

  const callApi = async () => {
    if (accounts.length === 0) {
      console.warn("No logged-in account found");
      return;
    }

    try {
      // Acquire an access token silently for your API
      const tokenResponse = await instance.acquireTokenSilent({
        scopes: [import.meta.env.VITE_SCOPE], // e.g., api://<API-client-id>/Files.Upload
        account: accounts[0],
      });

      const token = tokenResponse.accessToken;

      // Call your Azure Function API with the token
      const apiResponse = await fetch(
        `${import.meta.env.VITE_FUNCTION_APP_URL}/GetSasToken`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!apiResponse.ok) {
        throw new Error(`API returned ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      console.log("API response:", data);
      alert(`API response: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error("Error calling API:", error);
      alert(`Error calling API: ${error.message}`);
    }
  };

  return (
    <button onClick={callApi} style={{ marginTop: "1rem" }}>
      Call API
    </button>
  );
}
