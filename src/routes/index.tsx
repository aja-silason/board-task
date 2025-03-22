import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { LogIn } from "../board";
import { NotFound } from "../board/NotFound.screen";
import { Register } from "../board/register";
import { Home } from "../board/page";
import DragAndDropApp from "../board/page/drag";

export function RoutesApp() {
    return (
        <Router>

            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<LogIn/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/drag" element={<DragAndDropApp/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>

        </Router>
    )
}