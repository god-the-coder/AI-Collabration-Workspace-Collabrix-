


import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

// Landing
import Landing from "../pages/Landing/Landing";

// auth
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/Register";

// dashboard
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";

// workspace
import WorkspaceLayout from "../components/layout/WorkSpaceLayout";
import WorkspaceOverview from "../pages/Workspaces/WorkspaceOverview";
import Workspaces from "../pages/Workspaces/Workspaces";
import WorkspaceProjects from "../pages/Workspaces/WorkspaceProjects";
import WorkspaceMembers from "../pages/Workspaces/WorkspaceMembers";

// projects
import Projects from "../pages/Projects/Projects";
import Overview from "../pages/Projects/Overview";
import ProjectLayout from "../components/layout/ProjectLayout";
import ProjectTasks from "../pages/Projects/ProjectTasks";
import ProjectMembers from "../pages/Projects/ProjectMembers";


// tasks
import Tasks from "../pages/Tasks/Tasks";

// ai-assistant
import AIAssistant from "../pages/AIAssistant/AiAssistant";

// profile
import Profile from "../pages/Profile/Profile";

// settings
import Settings from "../pages/Settings/Settings";

// communication module
import Chats from "../pages/chats/Chats";


function AppRoutes() {
    return (
        <Routes>

            {/* Landing */}
            <Route path="/" element={<Landing />} />

            {/* Guest Routes */}
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <GuestRoute>
                        <Register />
                    </GuestRoute>
                }
            />

            {/* Protected Application */}
            <Route
                element={
                    // <ProtectedRoute>
                        <DashboardLayout />
                    /* </ProtectedRoute> */
                }
            >

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Global Modules */}
                <Route path="/workspaces" element={<Workspaces />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                {/* Workspace Module */}
                <Route
                    path="/workspaces/:workspaceId"
                    element={<WorkspaceLayout />}
                >
                    <Route index element={<WorkspaceOverview />} />

                    <Route
                        path="projects"
                        element={<WorkspaceProjects />}
                    />

                    <Route
                        path="members"
                        element={<WorkspaceMembers />}
                    />

                    <Route
                        path="chat"
                        element={<Chats />}
                    />

                    {/* <Route
                        path="settings"
                        element={<WorkspaceSettings />}
                    /> */}
                </Route>
                
                
                
                <Route
                    path="/projects/:projectId"
                    element={<ProjectLayout/>}
                >
                    <Route index element={<Overview/>}/>

                    <Route path="tasks" element={<ProjectTasks/>}/>

                    <Route path="members" element={<ProjectMembers/>}/>

                    <Route path="chats" element={<Chats/>}/>
                                
                </Route>

                <Route path="/chats" element={<Chats />}/>

            </Route>


            

            

        </Routes>
    );
}

export default AppRoutes;