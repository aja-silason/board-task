import { Button } from "./components/button/button";
import { SocialMidiaCard } from "./components/card/socialmedia.card";
import { Input } from "./components/input/input";
import { FacebookLogo, GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import logoBoard from "../assets/logo-board.png";
import { ThinText } from "./components/text/thintext";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./hook/auth/useLogin";
import { useEffect } from "react";

type props = {
    user: object
}

export function LogIn({user}: props){

    const time = new Date();
    const year = time?.getFullYear();

    const navigate = useNavigate();

    const {data, handleChange, handleSubmit, handleLoginWithGoogle, handleLoginFacebook, handleLoginGithub} = useLogin();
    
    useEffect(() => {
        
        if(user){
            navigate("/home", {replace: true})
        }
    }, [user, navigate])
        

            
    return (
        <div className={`w-full md:h-screen flex flex-col items-center justify-center`}>
            
            {
            //<div className="flex justify-end items-start w-full">
              //  <ButtonTheme />
            //</div>
            }

            <div className={`flex flex-col items-center justify-center border w-[40em] rounded-[.5em] gap-[1em] p-[4em]`}>
                

                <div className="flex flex-col text-center mb-[1em]">
                    <img src={logoBoard} alt="Logo Board" className="w-[18em]"/>

                    <ThinText text="Entre"/>
                    <ThinText text="Gerencia as suas tarefas no quadro"/>

                </div>

                <div className="flex flex-col w-full">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[2em]">
                        <Input value={data?.email} name="email" onChange={handleChange} placeholder="Insira seu email" type="email" required/>
                        <Input placeholder="Sua password" type="password" value={data?.password} name="password" onChange={handleChange} required/>


                        <Button text="Entrar" type="submit"/>

                        <div className="flex flex-col gap-[.7em]">
                            <ThinText text="Entrar com" center/>
                            
                            <SocialMidiaCard social_midia_logo={<GoogleLogo size={25}/>} text="Google" onClick={handleLoginWithGoogle}/>

                            <SocialMidiaCard social_midia_logo={<FacebookLogo size={25}/>} text="Facebook" onClick={handleLoginFacebook}/>
                            
                            <SocialMidiaCard social_midia_logo={<GithubLogo size={25}/>} text="GitHub" onClick={handleLoginGithub}/>
                        </div>

                        <Link to={'/register'}><ThinText text="Não possui conta? Criar conta" end/></Link>

                        <p className="text-[11pt] text-[gray] font-[400] text-center">{year} @ todos os direitos reservados a STETMENT MC</p>

                    </form>
                </div>
            </div>

        </div>
    )

} 