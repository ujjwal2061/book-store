import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ContextProvider } from "./Users/context/userContext.jsx";

import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <Toaster  />
      <App />
    </ContextProvider>
  </BrowserRouter>
);
