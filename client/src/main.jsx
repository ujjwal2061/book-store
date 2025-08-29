import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ContextProvider } from "./Users/context/userContext.jsx";

import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-providere";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
  <BrowserRouter>
    <ContextProvider>
      <Toaster  />
      <App />
    </ContextProvider>
  </BrowserRouter>
  </ThemeProvider>
);
