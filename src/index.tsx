import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.min.css";
import { Router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);
