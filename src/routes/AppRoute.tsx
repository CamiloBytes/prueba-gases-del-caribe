import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../page/LoginPage"
import PublicRoute from "../guard/PublicRoute"

export const AppRoute = () => {
  return (

    <Routes>
      <Route path="/" element={
        <PublicRoute>
          {<LoginPage />}
        </PublicRoute>}
        />
    </Routes>

  )
}
