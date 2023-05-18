import { ReactNode } from "react";
import UserManagement from '@/pages/UserManagement';
import Article from "@/pages/Article";
import Comment from "@/pages/Comment";

interface TypeRoute {
    path: string;
    element: ReactNode;
}
interface TypeRoutes extends Array<TypeRoute> { }
export const routeAuth: TypeRoutes = [
    {
        path: '/users',
        element: <UserManagement />
    },
    {
        path: '/article',
        element: <Article />
    },
    {
        path: '/comment',
        element: <Comment />
    },
]
export const api = {
    auth: {
        login: '/login',
        register: '/users'
    },
    users: {
        get: '/users',
        put: '/user',
        delete: '/users'
    },
    article: {
        get: '/articles',
        post: '/articles',
        put: '/articles',
        delete: '/articles'
    }
}