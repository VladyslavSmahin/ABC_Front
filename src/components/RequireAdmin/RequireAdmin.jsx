import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.js";

const RequireAdmin = () => {
    const { user, loading } = useUser();

    if (loading) return <div style={{ padding: 40 }}>Checking access...</div>;

    if (!user || !user.isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default RequireAdmin;
