import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from React 18
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="677211527727-v3utac8cn7igiovqjadmoalafsdjv9d5.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
