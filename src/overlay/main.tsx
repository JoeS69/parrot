import React from "react";
import ReactDOM from "react-dom/client";
import SpeakingOverlay from "./SpeakingOverlay";
import "@/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SpeakingOverlay />
  </React.StrictMode>,
);
