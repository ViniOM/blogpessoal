import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toastAlerta } from "../../../utils/toastAlerta";
import { useNavigate } from "react-router-dom";
import { buscar } from "../../../services/Service";
import Usuario from "../../../models/Usuarios";
import { Dna } from "react-loader-spinner";
import CardUsuario from "../cardUsuarios.tsx/CardUsuario";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  async function buscarPostagens() {
    try {
      await buscar("/usuarios/all", setUsuarios, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        toastAlerta("O token expirou, favor logar novamente", "info");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarPostagens();
  }, [usuarios.length]);

  return (
    <>
      {usuarios.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuarios.map((usuario) => (
          <CardUsuario key={usuario.id} user={usuario} />
        ))}
      </div>
    </>
  );
}

export default ListaUsuarios;
