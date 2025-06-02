import {BrowserRouter,Routes,Route} from "react-router-dom";
import Homeinicial from "../pages/logar/homeinicial.js"
import CadastroMorador from "../pages/logar/cadastroMorador.js";
import CadastroVisitante from "../pages/logar/cadastroVisitante.js";
import Login from "../pages/logar/login";
import Admindashboard from "../pages/feed/admindashboard";
import Userdashboard from "../pages/feed/userdashboard";

function AppRoutes(){

    return (
       <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Homeinicial />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/CadastroVisitante" element={<CadastroVisitante />} />
        <Route exact path="/CadastroMorador" element={<CadastroMorador />} />
        <Route exact path="/admindashboard" element={<Admindashboard />} />
        <Route exact path="/userdashboard" element={<Userdashboard />} />

      </Routes>
       </BrowserRouter>
      );
}

export default AppRoutes