import Login from "./components/Authentication/Login"
import NavBar from "./components/Header/NavBar";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mail from "./Mail/Mail";


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
         </Routes>
       </Router>
  </> 
  );
}

export default App;
