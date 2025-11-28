import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(document.getElementById(container.id) as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

