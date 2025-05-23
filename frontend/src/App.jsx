import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./routes/Layout/Layout";
import { HomePage } from "./routes/homePage/homePage";
import { ListPage } from "./routes/ListPage/ListPage";
import { SinglePage } from "./routes/SinglePage/SinglePage.tsx";
import { ProfilePage } from "./routes/ProfilePage/ProfilePage.tsx";
import { Login } from "./routes/Login/Login";
import { Register } from "./routes/Register/Register";
import { NewListingPage } from "./routes/NewListingPage/NewListingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/:id",
        element: <SinglePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/new-listing",
        element: <NewListingPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
