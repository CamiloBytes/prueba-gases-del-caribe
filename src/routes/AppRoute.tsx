import { Route, Routes } from "react-router-dom"
import PublicRoute from "../guard/PublicRoute"
import { Dashboard } from "../page/Dashboard"
import { LoginPage } from "../page/LoginPage"
import PrivateRouter from "../guard/PrivateRoute"
import { RegisterPage } from "../page/RegisterPage"
import { NotFound } from "../page/notFound"


export const AppRoute = () => {
  return (

    <Routes>
      <Route path="/" element={
        <PublicRoute>
          {<LoginPage />}
        </PublicRoute>}
        />
         <Route path="/register" element={
        <PublicRoute>
          {<RegisterPage />}
        </PublicRoute>}
        />


        <Route path="/profile" element={
          <PrivateRouter>
          {<Dashboard />}
        </PrivateRouter>}
        />

      <Route path="*" element={<NotFound/>}/>

    </Routes>

  )
}
