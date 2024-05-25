import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cadastro from "./pages/cadastro/Cadastro";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import ListaTemas from "./components/temas/listaTemas/ListaTemas";
import FormularioPostagem from "./components/postagens/formularioPostagem/FormularioPostagem";

import FormularioTema from "./components/temas/FormularioTema/FormularioTema";
import DeletarTema from "./components/temas/deletarTema/deletarTema";
import ListaPostagens from "./components/postagens/listaPostagem/listaPostagem";
import DeletarPostagem from "./components/postagens/deletarPostagem/DeletarPostagem";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Usuarios from "./components/usuarios/listaUsuarios/ListaUsuarios";
import { useContext } from "react";
import Perfil from "./pages/perfil/Perfil";
import CardUsuario from "./components/usuarios/cardUsuarios.tsx/CardUsuario";
import PerfilPorID from "./pages/perfil/porID/PerfilPorID";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastroTema" element={<FormularioTema />} />
              <Route path="/editarTema/:id" element={<FormularioTema />} />
              <Route path="/deletarTema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route
                path="/cadastroPostagem"
                element={<FormularioPostagem />}
              />
              <Route
                path="/editarPostagem/:id"
                element={<FormularioPostagem />}
              />
              <Route
                path="/deletarPostagem/:id"
                element={<DeletarPostagem />}
              />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/perfil/:id" element={<PerfilPorID />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
