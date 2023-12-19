import Login from "./pages/Login";
import User from "./pages/User";
import ProtectedRoute from "./hoc/ProtectedRoute";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
];
