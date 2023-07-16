import './App.css';
import { useState, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";

import {
  HomePage,
  ProfilePage,
  LoginPage,
  LogoutPage,
  RegisterPage,
  HealthPage,
} from "./pages";
import { ProtectedRoute, NavBar } from "./components";
import { useAppDispatch } from "./store/hooks";
import { AuthRoute } from "./components/AuthRoute";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return loading ? (
    <p>Loading, API cold start</p>
  ) : (
    <>
      <NavBar />
      <Routes>
        <Route path='/healthcheck' element={<HealthPage />} />
        <Route path='/home' element={<HomePage />} />

        <Route
          path='/register'
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />
        <Route
          path='/login'
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path='/logout'
          element={
            <ProtectedRoute>
              <LogoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/my-profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route element={<Navigate to='/home' replace />} />
      </Routes>
    </>
  );
}

export default App;
