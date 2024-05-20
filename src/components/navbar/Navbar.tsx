import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full bg-indigo-900 text-white flex justify-center py-4">
        <div className="container flex justify-between text-lg">
          <Link to="/">
            <div className="text-2xl font-bold uppercase ">Blog Pessoal</div>
          </Link>

          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/home" className=":hover:underline">
              Home
            </Link>
            <div className="hover:underline">Postagens</div>
            <div className="hover:underline">Temas</div>
            <div className="hover:underline">Cadastrar tema</div>
            <div className="hover:underline">Perfil</div>
            <Link to="/login" className="hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
