
import { createBrowserRouter } from "react-router-dom";
import {
    LandingPage,
    LoginPage,
    ErrorPage,
    RegisterPage
} from "./pages/index"
import Layout from "./layout";

import {action as registerAction} from "./pages/RegisterPage";
import {action as loginAction} from "./pages/LoginPage"
import { store } from "./store/store";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                index:true,
                element:<LandingPage></LandingPage>,
            },
            {
                path:"/login",
                element:<LoginPage></LoginPage>,
                action: loginAction(store)
            },
            {
                path:"/register",
                element:<RegisterPage></RegisterPage>,
                action: registerAction
            }
        ]
    }
])