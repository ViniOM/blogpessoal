import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div className="min-h-[78vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
