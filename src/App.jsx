import "./App.css";
import { Gallery } from "./components/Gallery";
import { Home } from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contact } from "./components/Contact";
import { RootLayout } from "./components/RootLayout";
import { Signup } from "./components/appwrite/Signup";
import { Login } from "./components/appwrite/Login";
import { Dashboard } from "./components/appwrite/Dashboard";
import { AlertBox } from "./components/appwrite/AlertBox";
import { ErrorPage } from "./components/appwrite/ErrorPage";
import { UserEvents } from "./components/UserEvents";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "gallery", element: <Gallery /> },
        // { path: "contact", element: <Contact /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "logout", element: <useLogout /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "userevents", element: <UserEvents /> },

        { path: "alertbox", element: <AlertBox /> },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
