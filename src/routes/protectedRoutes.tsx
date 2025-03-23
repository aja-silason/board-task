import { useNavigate } from "react-router-dom"

type props = {
    children: any,
    user: object
}

export const ProtectedRoute = ({children, user}: props) => {

    const navigate = useNavigate();

    return user ? children : navigate("/", {replace: true});

}