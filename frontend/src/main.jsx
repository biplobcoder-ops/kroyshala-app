import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: "#363636", color: "#fff" },
          }}
        />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);