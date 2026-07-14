import { Navigate, Routes, Route, Outlet } from "react-router-dom";

import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layaouts/DashboardPage";
import { TasksPage } from "../../features/tasks/TasksPage";


const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("userRole") ?? "";
  const isAdmin = role.toUpperCase().includes("ADMIN");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<Navigate to="/" replace />} />

      {/* PROTEGIDO POR ROLE */}
      <Route 
        path="/dashboard" 
        element={
          <RequireAdmin>
            {/* El Outlet se movió, DashBoardContainer ahora envuelve cada página individual si queremos o usamos Outlet. 
                Wait, en el nuevo diseño DashBoardContainer está dentro de cada página (DashboardPage, TasksPage). 
                Entonces el Outlet no es necesario si lo renderizan así. 
                O podemos hacer un layout común. */}
            <Outlet />
          </RequireAdmin>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="tasks" element={<TasksPage />} />
      </Route>

      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};