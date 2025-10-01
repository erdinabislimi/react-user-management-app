import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import App from "./App.js";
import UsersPage from "./pages/UsersPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
    { index: true, element: <UsersPage /> },
    { path: "users/:id", element: <UserDetailsPage /> },
  ]},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);