import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

type props = {
    children: ReactNode,
    user: any
}

export const ProtectedRoute = ({children, user}: props) => {

    console.log(user)

    return user ? children : <Navigate to={"/"} ></Navigate>

}