import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./reference-homepage.css";
import "./pages/public-pages.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//For managing and caching server state in React applications
// QueryClient is the core of React Query, managing the cache and configuration
// QueryClientProvider is a context provider that makes the QueryClient available to all components in the
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
