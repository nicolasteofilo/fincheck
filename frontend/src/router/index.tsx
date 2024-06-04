import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";

import { Dashboard, Login, Register } from "../view/pages/";
import { AuthLayout } from "../view/layouts";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
