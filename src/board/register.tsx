import { useState } from "react";
import { Button } from "./components/button/button";
import { SocialMidiaCard } from "./components/card/socialmedia.card";
import { LoginInput } from "./components/input/login.input";
import { ArrowLeft, FacebookLogo, GithubLogo, GoogleLogo } from "@phosphor-icons/react";

import logoBoard from "../../public/logo-board.png";
import { ThinText } from "./components/text/thintext";
import { Link } from "react-router-dom";

enum SIGUPSTEP {
    step_email = 1,
    step_number = 2,
    step_password = 3,
}

export function Register(){

    const [step, setStep] = useState<number>(SIGUPSTEP.step_email);

    const time = new Date();
    const year = time?.getFullYear();


    const handleStepEmail = () => setStep(SIGUPSTEP.step_number) 

    const handleStepNumber = () => setStep(SIGUPSTEP.step_password);
    
    const handleStepBackEmail = () => setStep(SIGUPSTEP.step_email);
    
    const handleStepBackNumber = () => setStep(SIGUPSTEP.step_number);

    const handleStepPassword = () => {
        setStep(SIGUPSTEP.step_email)
        console.log("Password to Email")
    }

    return (
        <div className="w-full md:h-screen border flex items-center justify-center">
            <div className="flex flex-col items-center justify-center border w-[40em] rounded-[.5em] gap-[1em] p-[4em]">

                <div className="flex flex-col text-center mb-[1em]">
                    <img src={logoBoard} alt="Logo Board" className="w-[18em]"/>
                    <p className="text-[12pt] font-[500]">Criar Conta</p>
                    <p className="text-[12pt] font-[500]">Gerencia as suas tarefas no quadro</p>
                </div>

                <div className="flex flex-col w-full">
                    <form action="" className="w-full flex flex-col gap-[2em]">

                        {
                            step == SIGUPSTEP.step_email ? (
                                <div className="flex flex-col gap-[.8em]">
                                    <LoginInput placeholder="Insira seu email" type="email" required/>
                                    <LoginInput placeholder="Insira seu Nome completo" type="email" required/>
                                </div>
                            ) : 

                            step == SIGUPSTEP.step_number ? (
                                <div className="flex flex-col gap-[.8em]">
                                    <LoginInput placeholder="Insira seu número telefonico" type="email" required/>
                                    <button type="button" className="flex gap-[.5em] items-center border-none bg-none" onClick={handleStepBackEmail}>
                                        <ArrowLeft/>
                                        Voltar
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-[.8em]">
                                    <LoginInput placeholder="Insira sua password" type="email" required/>
                                    <LoginInput placeholder="Confirme sua password" type="email" required/>
                                    <button type="button" className="flex gap-[.5em] items-center border-none bg-none" onClick={handleStepBackNumber}>
                                        <ArrowLeft/>
                                        Voltar
                                    </button>
                                </div>
                            ) 
                            
                        }

                        <Button onClick={step == SIGUPSTEP.step_email ? handleStepEmail: step == SIGUPSTEP.step_number ? handleStepNumber : handleStepPassword} text={ step == SIGUPSTEP.step_email ? "Próximo" : step == SIGUPSTEP.step_number ? "Próximo" : "Entrar"} />



                        {//<button className="border p-[.8em]">Login BTN</button>
                        }

                        <div className="flex flex-col gap-[.7em]">
                            <span className="text-center font-[500] text-gray-500">Entrar com</span>
                            <SocialMidiaCard social_midia_logo={<GoogleLogo size={25}/>} text="Google"/>

                            <SocialMidiaCard social_midia_logo={<FacebookLogo size={25}/>} text="Facebook"/>
                            
                            <SocialMidiaCard social_midia_logo={<GithubLogo size={25}/>} text="GitHub"/>
                        </div>

                        <Link to={"/"}><ThinText text="Tenho uma conta. Logar"/></Link>

                        <p className="text-[11pt] text-[gray] font-[400] text-center">{year} @ todos os direitos reservados a STETMENT MC</p>

                    </form>
                </div>
            </div>

        </div>
    )

} 