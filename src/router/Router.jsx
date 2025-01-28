import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AuthProvider from "../providers/AuthProvider";
import Home from "../components/templates/Home";
import { getCookie } from "../utils/cookie";
import UserDetails from "../components/modules/UserDetails";

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
        <Route
          path="/users/:id"
          element={token ? <UserDetails /> : <Navigate to="/login" />}
        />
        {/* <Route
        path="/login"
        element={<LoginPage />}
      /> */}
      </Routes>
    </>
  );
};

export default Router;
