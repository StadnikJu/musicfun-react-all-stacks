import { createRoot } from "react-dom/client";
import { App } from "./app/ui/App.tsx";
import { BrowserRouter } from "react-router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
