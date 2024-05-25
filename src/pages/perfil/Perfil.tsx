import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginLogo from "../../assets/login.jpg";
import { toastAlerta } from "../../utils/toastAlerta";
import { AuthContext } from "../../context/AuthContext";
import { buscarPostagemPorUsuario } from "../../services/Service";
import Postagem from "../../models/Postagem";
import { Dna } from "react-loader-spinner";
import PostagemPerfil from "../../components/perfil/postagemPerfil";

function Perfil() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (usuario.token === "") {
      toastAlerta(
        "Dados inconsistentes. Verifique as informações de cadastro.",
        "erro",
      );
      navigate("/login");
    }
  }, [usuario.token]);

  useEffect(() => {
    const buscarPostagemPorUser = async () => {
      try {
        await buscarPostagemPorUsuario(
          `/postagem/usuario/${usuario.id}`,
          setPostagens,
          {
            header: { Authorization: usuario.token },
          },
        );
      } catch (error) {
        if (error.toString().includes("403")) {
          toastAlerta("O token expirou, favor logar novamente", "info");
          handleLogout();
        }
      }
      buscarPostagemPorUser();
    };
  }, [postagens.length]);

  if (!buscarPostagemPorUsuario) {
    return (
      <div>
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4 rounded-2xl overflow-hidden">
      <img
        className="w-full h-72 object-cover border-b-8 border-white"
        src={loginLogo}
        alt="Capa do Perfil"
      />
      <img
        src={usuario.foto}
        alt={`Foto de perfil de ${usuario.nome}`}
        className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
      />
      <div className="relative mt-[-6rem] h-72 flex flex-col bg-sky-500 text-white text-2xl items-center justify-center">
        <p>Nome: {usuario.nome}</p>
        <p>Email: {usuario.usuario}</p>
        <p>Admin: {usuario.admin ? "Sim" : "Não"}</p>
      </div>
      <PostagemPerfil />
    </div>
  );
}

export default Perfil;
