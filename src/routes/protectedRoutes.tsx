import { Navigate } from "react-router-dom"

type props = {
    children: any,
    user: object
}

export const ProtectedRoute = ({children, user}: props) => {

    return user ? children : <Navigate to="/"></Navigate>;

}
