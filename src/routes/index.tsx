import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { LogIn } from "../board";
import { NotFound } from "../board/NotFound.screen";
import { Register } from "../board/register";
import { Home } from "../board/page";
//import DragAndDropApp from "../board/page/drag";
import { useAuth } from "../board/context/auth.context";
import { ProtectedRoute } from "./protectedRoutes";
import { Task } from "../board/page/task";
import { Board } from "../board/page/board";
import { ProfileTask } from "../board/page/profile-task";

export function RoutesApp() {

    const {user} = useAuth();

    return (
        <Router>

            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<LogIn user={user}/>} />

                <Route path="/home" element={<ProtectedRoute user={user}><Home/></ProtectedRoute>} />
                <Route path="/tasks" element={<ProtectedRoute user={user}><Task/></ProtectedRoute>} />
                <Route path="/board" element={<ProtectedRoute user={user}><Board/></ProtectedRoute>} />
                <Route path="/task/:id" element={<ProtectedRoute user={user}><ProfileTask/></ProtectedRoute>} />
                
                {/*<Route path="/drag" element={<DragAndDropApp/>} />*/}
                <Route path="/register" element={<Register/>} />
            </Routes>

        </Router>
    )
}
