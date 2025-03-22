import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { LogIn } from "../board";
import { NotFound } from "../board/NotFound.screen";
import { Register } from "../board/register";
import { Home } from "../board/page";
import DragAndDropApp from "../board/page/drag";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase.config";
import { useAuth } from "../board/context/auth.context";
import { ProtectedRoute } from "./protectedRoutes";

export function RoutesApp() {

    const {user, setUser} = useAuth();

    /*useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
                return;
            }
            setUser(null)
        });

        return () => unsubscribe();

    }, [])*/

    return (
        <Router>

            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<LogIn/>} />
                <Route path="/home" element={
                    <ProtectedRoute user={user}><Home/></ProtectedRoute>
                    } />
                <Route path="/drag" element={<DragAndDropApp/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>

        </Router>
    )
}