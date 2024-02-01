import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/index.redux.js";

import "./index.css";
import EmailVerification from "./pages/EmailVerification.page.jsx";
import LogIn from "./pages/LogIn.page.jsx";
import SignIn from "./pages/SignIn.page";
import Welcome from "./pages/Welcome.page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/verification",
    element: <EmailVerification />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
);
