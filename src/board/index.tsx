import { useState } from "react";
import { ClickButton } from "./components/button/click.button";
import { SocialMidiaCard } from "./components/card/socialmedia.card";
import { LoginInput } from "./components/input/login.input";
import { ArrowLeft, FacebookLogo, GithubLogo, GoogleLogo } from "@phosphor-icons/react";

import logoBoard from "../../public/logo-board.png";

enum LOGINSTEP {
    step_email = 1,
    step_password = 2
}

export function LogIn(){

    const [step, setStep] = useState<number>(LOGINSTEP.step_email);

    const time = new Date();
    const year = time?.getFullYear();


    const handleStepEmail = () => setStep(LOGINSTEP.step_password) 

    const handleStepBack = () => setStep(LOGINSTEP.step_email);

    const handleStepPassword = () => {
        setStep(LOGINSTEP.step_email)
        console.log("Password to Email")
    }

    return (
        <div className="w-full md:h-screen border flex items-center justify-center">
            <div className="flex flex-col items-center justify-center border w-[40em] rounded-[.5em] gap-[1em] p-[4em]">

                <div className="flex flex-col text-center mb-[1em]">
                    <img src={logoBoard} alt="Logo Board" className="w-[18em]"/>
                    <p className="text-[12pt] font-[500]">Entre</p>
                    <p className="text-[12pt] font-[500]">Gerencia as suas tarefas no quadro</p>
                </div>

                <div className="flex flex-col w-full">
                    <form action="" className="w-full flex flex-col gap-[2em]">

                        {
                            step == LOGINSTEP.step_email && <LoginInput placeholder="Insira seu email" type="email" required/>
                        }


                        {
                            step == LOGINSTEP.step_password && (
                                <>
                                    <LoginInput placeholder="Sua password" type="email" required/>
                                    <button type="button" className="flex gap-[.5em] items-center border-none bg-none" onClick={handleStepBack}>
                                        <ArrowLeft/>
                                        Voltar
                                    </button>
                                </>
                            )
                        }

                        <ClickButton onClick={step == LOGINSTEP.step_email ? handleStepEmail: handleStepPassword} text={ step == LOGINSTEP.step_email ? "Próximo" : "Entrar"} />



                        {//<button className="border p-[.8em]">Login BTN</button>
                        }

                        <div className="flex flex-col gap-[.7em]">
                            <span className="text-center font-[500] text-gray-500">Entrar com</span>
                            <SocialMidiaCard social_midia_logo={<GoogleLogo size={25}/>} text="Google"/>

                            <SocialMidiaCard social_midia_logo={<FacebookLogo size={25}/>} text="Facebook"/>
                            
                            <SocialMidiaCard social_midia_logo={<GithubLogo size={25}/>} text="GitHub"/>
                        </div>

                        <p className="text-[12pt] font-[500] text-end">Não possui conta? Criar conta</p>

                        <p className="text-[11pt] text-[gray] font-[400] text-center">{year} @ todos os direitos reservados a STETMENT MC</p>

                    </form>
                </div>
            </div>

        </div>
    )

} 