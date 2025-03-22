import { ReactNode } from "react"
import { Navigate, useNavigate } from "react-router-dom"

type props = {
    children: any,
    user: any
}

export const ProtectedRoute = ({children, user}: props) => {

    return user ? children : <Navigate to={"/"} ></Navigate>

}