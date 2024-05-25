import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import loginLogo from "../../../assets/login.jpg";
import { AuthContext } from "../../../context/AuthContext";
import Usuario from "../../../models/Usuarios";
import { toastAlerta } from "../../../utils/toastAlerta";
import { buscar } from "../../../services/Service";
import { Dna } from "react-loader-spinner";
import PostagemPerfilPorID from "../../../components/perfil/porID/PostagemPerfilPorID";

function PerfilPorID() {
  const { id } = useParams();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [profileUser, setProfileUser] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
      toastAlerta(
        "Dados inconsistentes. Verifique as informações de cadastro.",
        "erro",
      );
      navigate("/login");
    } else {
      const buscarId = async () => {
        try {
          await buscar(`/usuarios/${id}`, setProfileUser, {
            headers: {
              Authorization: usuario.token,
            },
          });
        } catch (error) {
          if (error.toString().includes("403")) {
            toastAlerta("O token expirou, favor logar novamente", "info");
            handleLogout();
          }
          toastAlerta("Erro ao buscar informações do perfil.", "erro");
        }
      };

      buscarId();
    }
  }, [id, usuario.token, navigate]);

  if (!profileUser) {
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
        src={profileUser.foto}
        alt={`Foto de perfil de ${profileUser.nome}`}
        className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
      />
      <div className="relative mt-[-6rem] h-72 flex flex-col bg-sky-500 text-white text-2xl items-center justify-center">
        <p>Nome: {profileUser.nome}</p>
        <p>Email: {profileUser.usuario}</p>
        <p>Admin: {profileUser.admin ? "Sim" : "Não"}</p>
      </div>
      <PostagemPerfilPorID />
      
    </div>
  );
}

export default PerfilPorID;
