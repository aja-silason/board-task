import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { LogIn } from "../modules";
import { NotFound } from "../modules/NotFound.screen";

export function RoutesApp() {
    return (
        <Router>

            <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<LogIn/>} />
                <Route path="/" element={<LogIn/>} />
            </Routes>

        </Router>
    )
}