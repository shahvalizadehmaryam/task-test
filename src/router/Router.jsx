import { Navigate, Route, Routes } from "react-router-dom";
import RegistrationPage from "pages/RegistrationPage";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFound";
import AuthProvider from "providers/AuthProvider";
import Home from "../components/templates/Home";
import { getCookie } from "../utils/cookie";

const Router = () => {
const token = getCookie("token");

return (
  <>
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider>
            <Home />
          </AuthProvider>
        }
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <LoginPage />}
      />
    </Routes>
  </>
);
};

export default Router;
