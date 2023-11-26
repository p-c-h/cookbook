import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";

import App from "./App.tsx";
import RecipeManager from "./components/RecipeManager.tsx";

import "./i18n/i18n.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/recipes/add",
        element: <RecipeManager action="add" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);
