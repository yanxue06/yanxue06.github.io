import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider";

const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((mod) => ({ default: mod.Analytics }))
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  </React.StrictMode>,
);
