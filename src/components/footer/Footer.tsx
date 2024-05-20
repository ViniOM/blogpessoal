import {
  FaceMask,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";

function Footer() {
  return (
    <>
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Desevolvido com ❤️ por Vinicios Gabriel | Copyright ©
          </p>
          <p className="text-lg">Acesse minhas redes sociais</p>
          <div className="flex gap-2">
            <a href="https://www.linkedin.com/in/viniom/" target="_blank">
              <LinkedinLogo size={48} weight="bold" />
            </a>

            <a href="https://www.instagram.com/v1ni.kk/" target="_blank">
              <InstagramLogo size={48} weight="bold" />
            </a>

            <a href="https://github.com/ViniOM" target="_blank">
              <GithubLogo size={48} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
