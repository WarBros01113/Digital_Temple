import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from React 18
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="971448906126-khini0p1f8jrd62b5c8s39sednkvtmsj.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
