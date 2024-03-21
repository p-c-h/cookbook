import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";

import App from "./App.tsx";
import RecipeManager from "./components/RecipeManager.tsx";
import RecipeManager2 from "./components/RecipeManager2.tsx";

import "./i18n/i18n.ts";

import "./index.css";

// Delete Foo
import Foo from "./components/Foo.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/recipes/add",
        element: <RecipeManager action="add" />,
      },
      {
        path: "/rm2",
        element: <RecipeManager2 />,
      },
    ],
  },
  {
    path: "/foo",
    element: <Foo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);
