import React, { ReactElement, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ProtectedRoutes from '@/pages/ProtectedRoutes'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Register from '@/pages/Register'
import { routeAuth } from '@/routes/constant'


type Props = {}
const AppRoutes: React.FC = (props: Props) => {
    // const navigate = useNavigate();
    return (

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />} >
                <Route key={'/'} path={'/'} element={<Home />} >
                    {routeAuth.map(x => <Route key={crypto.randomUUID()} path={x?.path} element={x?.element} />
                    )
                    }
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes