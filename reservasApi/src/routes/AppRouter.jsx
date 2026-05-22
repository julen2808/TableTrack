import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import PanelPage from "../pages/PanelPage";



function AppRouter() {

  const user = JSON.parse(localStorage.getItem("host"));

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/panel"
          element={
            user ? <PanelPage /> : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRouter;

//  define rutas-- protege /panel-- si no hay sesión → redirige login