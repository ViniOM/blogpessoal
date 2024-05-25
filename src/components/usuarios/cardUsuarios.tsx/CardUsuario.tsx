import { Link } from "react-router-dom";
import Usuario from "../../../models/Usuarios";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

interface CardUsuarioProps {
  user: Usuario;
}

function CardUsuario({ user }: CardUsuarioProps) {
  const { usuario } = useContext(AuthContext);

  return (
    <Link to={`/perfil/${user.id}`} className="">
      <div className="hover:cursor-pointer  border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4  hover:bg-indigo-500 transition-colors duration-300">
          <img
            src={user.foto}
            className="h-12 rounded-full"
            alt={`${user.nome} profile`}
          />
          <h3 className="text-lg font-bold text-center uppercase">
            {user.nome}
          </h3>
          {usuario.admin && (
            <button
              className={`text-white font-bold px-2 justify-end 	${
                user.admin ? "bg-green-400" : "bg-red-500"
              }`}
              style={{ textDecoration: "none" }}
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CardUsuario;
