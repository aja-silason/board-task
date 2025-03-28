import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { LogIn } from "../board";
import { NotFound } from "../board/NotFound.screen";
import { Register } from "../board/register";
import { Home } from "../board/page";
//import DragAndDropApp from "../board/page/drag";
import { useAuth } from "../board/context/auth.context";
import { ProtectedRoute } from "./protectedRoutes";
import { Task } from "../board/page/task";
import { ProfileTask } from "../board/page/profile-task";
import { Invite } from "../board/page/invite";

export function RoutesApp() {

    const {user} = useAuth();

    return (
        <Router>

            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<LogIn user={user}/>} />

                <Route path="/home" element={<ProtectedRoute user={user}><Home/></ProtectedRoute>} />
                <Route path="/tasks" element={<ProtectedRoute user={user}><Task/></ProtectedRoute>} />
                <Route path="/task/:id" element={<ProtectedRoute user={user}><ProfileTask/></ProtectedRoute>} />
                <Route path="/invite/:data" element={<ProtectedRoute user={user}><Invite/></ProtectedRoute>} />
                
                {/*<Route path="/drag" element={<DragAndDropApp/>} />*/}
                <Route path="/register" element={<Register/>} />
            </Routes>

        </Router>
    )
}
