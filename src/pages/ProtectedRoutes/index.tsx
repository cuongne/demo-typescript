import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type Props = {}

const ProtectedRoutes: React.FC = (props: Props) => {
    const location = useLocation();
    const token = localStorage.getItem('token')
    return (
        <>
            {token ? (
                <Outlet />
            ) : (
                <Navigate to="/login" replace state={{ path: location.pathname }} />
            )
            }
        </>
    )
}

export default ProtectedRoutes