import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import AuthProvider from './auth/authProvider';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import PrivateRoute from './router/route';
import SignUp from "./pages/signup";
import EventProvider from "./context/eventContext";
import { Task } from "@mui/icons-material";
import TaskProvider from "./context/taskContext";
// https://github.com/gbopola/todolist-app-react-js/blob/main/src/App.css
function App() {
  return (
    <div className="App">
      <Router>
      <EventProvider>
        <TaskProvider>
        <AuthProvider>
          <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
            <Route  exact path="/login" element={<Login />} />
            <Route  exact path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
        </TaskProvider>
        </EventProvider>
        
      </Router>
    </div>
  );
}

export default App;
