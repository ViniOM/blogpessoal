import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Footer() {
  const { usuario, handleLogout } = useContext(AuthContext);

  let footerComponent;

  let data = new Date().getFullYear();

  if (usuario.token !== "") {
    footerComponent = (
      <>
        <div className="flex justify-center bg-indigo-900 text-white">
          <div className="container flex flex-col items-center py-4">
            <p className="text-xl font-bold">
              Feito com ❤️ por Vinicios Gabriel | Copyright: {data}
            </p>
            <p className="text-lg">Acesse nossas redes sociais</p>
            <div className="flex gap-2">
              <Link to={"https://www.linkedin.com/in/viniom/"}>
                <LinkedinLogo size={48} weight="bold" />
              </Link>
              <Link to={"https://www.instagram.com/v1ni.kk/"}>
                <InstagramLogo size={48} weight="bold" />
              </Link>
              <Link to={"https://github.com/ViniOM"}>
                <GithubLogo size={48} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{footerComponent}</>;
}

export default Footer;
