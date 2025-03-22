import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

type props = {
    children: ReactNode,
    user: any
}

export const ProtectedRoute = ({children, user}: props) => {

    const navigate = useNavigate();

    return user ? children : navigate("/", {replace: true})

}