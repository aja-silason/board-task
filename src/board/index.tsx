import { Button } from "./components/button/button";
import { SocialMidiaCard } from "./components/card/socialmedia.card";
import { Input } from "./components/input-data/input";
import { FacebookLogo, GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import logoBoard from "../assets/logo-board.png";
import { Text } from "./components/text/text";
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

    const {data, isLoading, handleChange, handleSubmit, handleLoginWithGoogle, handleLoginFacebook, handleLoginGithub} = useLogin();
    
    useEffect(() => {
        
        if(user){
            navigate("/home", {replace: true})
        }
    }, [user, navigate])
        

            
    return (
        <div className={`w-full h-screen flex flex-col items-center justify-center`}>
            
            <div className={`flex flex-col items-center justify-center md:border md:w-[35%] md:justify-center rounded-[.5em] gap-[1em] p-[3em]`}>
                

                <div className="flex flex-col items-center text-center mb-[1em]">
                    <img src={logoBoard} alt="Logo Board" className="w-[40%]"/>

                    <Text text="Entre"/>
                    <Text text="Gerencia as suas tarefas no quadro"/>

                </div>

                <div className="flex flex-col w-full">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[.8em]">
                        <Input value={data?.email} name="email" onChange={handleChange} placeholder="Insira seu email" type="email" required/>
                        <Input placeholder="Sua password" type="password" value={data?.password} name="password" onChange={handleChange} required/>
                        <Button text="Entrar" type="submit" isLoading={isLoading}/>

                        <div className="flex flex-col gap-[.4em]">
                            <Text text="Entrar com" center/>
                            <SocialMidiaCard social_midia_logo={<GoogleLogo size={25}/>} text="Google" onClick={handleLoginWithGoogle}/>
                            <SocialMidiaCard social_midia_logo={<FacebookLogo size={25}/>} text="Facebook" onClick={handleLoginFacebook}/>
                            <SocialMidiaCard social_midia_logo={<GithubLogo size={25}/>} text="GitHub" onClick={handleLoginGithub}/>
                        </div>

                        <Link to={'/register'}><Text text="Não possui conta? Criar conta" end/></Link>

                        <p className="text-[11pt] text-[gray] font-[400] text-center">{year} @ todos os direitos reservados a <strong>aja silason</strong></p>

                    </form>
                </div>
            </div>

        </div>
    )

} 