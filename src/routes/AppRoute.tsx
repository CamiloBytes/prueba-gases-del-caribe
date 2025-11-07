import { Route, Routes } from "react-router-dom"
import PublicRoute from "../guard/PublicRoute"
import { Dashboard } from "../page/Dashboard"
import { LoginPage } from "../page/LoginPage"

export const AppRoute = () => {
  return (

    <Routes>
      <Route path="/" element={
        <PublicRoute>
          {<LoginPage />}
        </PublicRoute>}
        />

        <Route path="/profile" element={
          <PublicRoute>
          {<Dashboard />}
        </PublicRoute>}
        />
    </Routes>

  )
}
