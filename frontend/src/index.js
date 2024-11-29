import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Replace with your Google OAuth client ID
const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; 

ReactDOM.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
