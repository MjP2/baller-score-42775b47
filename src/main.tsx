import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { seedIfEmpty } from "./lib/cms-seed";

seedIfEmpty();

createRoot(document.getElementById("root")!).render(<App />);
