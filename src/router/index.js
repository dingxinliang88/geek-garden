import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import AuthRoute from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <GeekLayout />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
