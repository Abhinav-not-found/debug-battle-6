import { createBrowserRouter, Navigate } from "react-router"
import { ROUTES } from "@/constants/index"
import DashboardPage from "@/features/auth/pages/DashboardPage"
import LoginPage from "@/features/auth/pages/LoginPage"
import SignupPage from "@/features/auth/pages/SignupPage"
import GamePage from "@/pages/GamePage"
import LandingPage from "@/pages/LandingPage"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <LandingPage />,
  },
  {
    path: ROUTES.GAME,
    element: <GamePage />,
  },
  {
    element: <PublicRoute />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: ROUTES.DASHBOARD, element: <DashboardPage /> }],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME} replace />,
  },
])

export default router
