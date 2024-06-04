import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signIn = false;
  
  if (!signIn && isPrivate) {
    return <Navigate to="/login" replace />
  }

  if (signIn && !isPrivate) {
    return <Navigate to="/" replace />
  }

  return <Outlet />;
}