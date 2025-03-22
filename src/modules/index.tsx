import { SocialMidiaCard } from "../common/components/card/socialmedia.card";
import { LoginInput } from "../common/components/input/login.input";
import { FacebookLogo, GithubLogo, GoogleLogo } from "@phosphor-icons/react";

export function LogIn(){
    const time = new Date();
    const year = time?.getFullYear();

    return (
        <div className="w-full md:h-screen border flex items-center justify-center">
            <div className="flex flex-col items-center justify-center border w-[40em] rounded-[.5em] gap-[1em] p-[4em]">

                <div className="flex flex-col text-center">
                    <span></span>
                    <span className="text-[12pt] font-[500]">Entre</span>
                    <span className="text-[12pt] font-[500]">Gerencia as suas tarefas no quadro</span>
                </div>

                <div className="flex flex-col w-full">
                    <form action="" className="w-full flex flex-col gap-[2em]">
                        <LoginInput placeholder="Insira seu email" type="email" required/>
                        <LoginInput placeholder="Sua password" type="email" required/>

                        <button className="border p-[.8em]">Login BTN</button>

                        <div className="flex flex-col gap-[.7em]">
                            <span className="text-center font-[500] text-gray-500">Entrar com</span>
                            <SocialMidiaCard social_midia_logo={<GoogleLogo size={25}/>} text="Google"/>

                            <SocialMidiaCard social_midia_logo={<FacebookLogo size={25}/>} text="Facebook"/>
                            
                            <SocialMidiaCard social_midia_logo={<GithubLogo size={25}/>} text="GitHub"/>
                        </div>

                        <p className="text-[12pt] font-[500]">Não possui conta? Criar conta</p>

                        <div>
                            {year} @ todos os direitos reservados a STETMENT MC
                        </div>


                    </form>
                </div>
            </div>

        </div>
    )

} 