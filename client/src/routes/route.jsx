import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "../components/body";
import Login from "../components/login";
import Signup from "../components/signup";
import CompletedTask from "../components/completed_task";
import UncompletedTasks from "../components/uncompleted_tasks";

const MyRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/:id" element={<Body/>} />
                <Route path="/tasks/completed/:id" element={<CompletedTask />} />
                <Route path="/tasks/uncompleted/:id" element={<UncompletedTasks/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoutes;