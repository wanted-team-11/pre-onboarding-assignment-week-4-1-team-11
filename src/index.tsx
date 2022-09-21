import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./styles/GlobalStlye";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
