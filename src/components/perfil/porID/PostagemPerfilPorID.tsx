import React, { useContext, useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Postagem from "../../../models/Postagem";
import { toastAlerta } from "../../../utils/toastAlerta";
import { buscarPostagemPorUsuario } from "../../../services/Service";
import Usuario from "../../../models/Usuarios";

function PostagemPerfilPorID() {
  const { id } = useParams();

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  let navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    const buscarPostagemPorUser = async () => {
      try {
        await buscarPostagemPorUsuario(
          `/postagens/usuario/${id}`,
          setPostagens,
          {
            headers: { Authorization: usuario.token },
          },
        );
        console.log(postagens);
      } catch (error) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", "info");
          handleLogout();
        }
      }
    };
    buscarPostagemPorUser();
  }, [postagens.length]);

  return (
    <div className="container mx-auto mt-4 rounded-2xl overflow-hidden">
      <div className="container mx-auto my-4">
        {postagens.length === 0 ? (
          <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3">
            {postagens.map((post) => (
              <div key={post.id} className="my-2 p-2 border-b">
                <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
                  <div>
                    <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                      <img
                        src={post.usuario?.foto}
                        className="h-12 rounded-full"
                        alt=""
                      />
                      <h3 className="text-lg font-bold text-center uppercase w-auto ">
                        {post.titulo}
                      </h3>
                    </div>
                    <div className="p-4 ">
                      <p>{post.texto}</p>
                      <p>Tema: {post.tema.descricao}</p>
                    </div>
                  </div>
                  {usuario.admin === true ? (
                    <div className="flex">
                      <Link
                        to={`/editarPostagem/${post.id}`}
                        className="w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2"
                      >
                        <button>Editar</button>
                      </Link>
                      <Link
                        to={`/deletarPostagem/${post.id}`}
                        className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center"
                      >
                        <button>Deletar</button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex mb-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostagemPerfilPorID;
