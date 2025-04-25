import Login from "./components/Authentication/Login"
import NavBar from "./components/Header/NavBar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mail from "./Mail/Mail";
import Inbox from "./Mail/Inbox";
import Sent from "./Mail/Sent";




function App() {
  return (
  <>
  <Router>
         <NavBar />
         <Routes>
           <Route path='/auth' element={<Login />} />
           <Route path='/' element={<Home />} />
           <Route path='*' element={<Home />} />
           <Route path='/mail' element={<Mail />} />
           <Route path='/sent' element={<Sent />} />
           <Route path='/inbox' element={<Inbox />} />
           
         </Routes>
       </Router>
  </> 
  );
}

export default App;
