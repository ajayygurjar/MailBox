import Login from "./components/Authentication/Login"
import NavBar from "./components/Header/NavBar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mail from "./Mail/Mail";
import Inbox from "./Mail/Inbox";
import Sent from "./Mail/Sent";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Navigate } from "react-router-dom";




function App() {
  return (
  <>
  <Router>
         <NavBar />
         <Routes>   <Route path='/auth' element={<Login />} />
          <Route path='/' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/mail' element={
            <PrivateRoute>
              <Mail />
            </PrivateRoute>
          } />
          <Route path='/sent' element={
            <PrivateRoute>
              <Sent />
            </PrivateRoute>
          } />
          <Route path='/inbox' element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          } />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
       </Router>
  </> 
  );
}

export default App;
