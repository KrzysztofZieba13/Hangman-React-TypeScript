import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HangmanProvider } from "./context/HangmanProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HangmanProvider>
      <App />
    </HangmanProvider>
  </StrictMode>
);
