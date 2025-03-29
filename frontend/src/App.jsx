import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./routes/Layout/Layout";
import { HomePage } from "./routes/homePage/homePage";
import { ListPage } from "./routes/ListPage/ListPage";
import { SinglePage } from "./routes/SinglePage/SinglePage";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
