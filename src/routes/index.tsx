import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { LogIn } from "../modules";

export function RoutesApp() {
    return (
        <Router>

            <Routes>
                <Route path="/" element={<LogIn/>} />
            </Routes>

        </Router>
    )
}