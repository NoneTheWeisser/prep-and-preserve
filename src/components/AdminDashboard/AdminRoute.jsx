import { Navigate } from "react-router-dom";
import useStore from "../../zustand/store";


export default function AdminRoute({ children }) {
  const user = useStore((state) => state.user);

  // If user is not logged in OR not admin, redirect to home
  if (!user.id || !user.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children; 
}