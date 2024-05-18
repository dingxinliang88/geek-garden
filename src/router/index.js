import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import AuthRoute from "@/components/AuthRoute";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Publish = lazy(() => import("@/pages/Publish"));
const Article = lazy(() => import("@/pages/Article"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <GeekLayout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={"loading..."}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={"loading..."}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"loading..."}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
