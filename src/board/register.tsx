import { Button } from "./components/button/button";
import { Input } from "./components/input-data/input";

import logoBoard from "../assets/logo-board.png";
import { Text } from "./components/text/text";
import { Link } from "react-router-dom";
import { useCreateAccount } from "./hook/auth/useCreateAccount";

export function Register(){

    const {data, handleChange, handleSubmit} = useCreateAccount();

    const time = new Date();
    const year = time?.getFullYear();

    return (
        <div className="w-full md:h-screen border flex items-center justify-center">
            <div className="flex flex-col items-center justify-center border w-[40em] rounded-[.5em] gap-[1em] p-[4em]">

                <div className="flex flex-col text-center mb-[1em]">
                    <img src={logoBoard} alt="Logo Board" className="w-[18em]"/>
                    <p className="text-[12pt] font-[500]">Criar Conta</p>
                    <p className="text-[12pt] font-[500]">Gerencia as suas tarefas no quadro</p>
                </div>

                <div className="flex flex-col w-full">
                    <form className="w-full flex flex-col gap-[2em]" onSubmit={handleSubmit}>

                        <div className="flex flex-col gap-[.8em]">

                            <Input placeholder="Insira seu email" type="email" value={data?.email} onChange={handleChange} name="email" required/>
                            
                            <Input placeholder="Insira o seu Username" type="text" value={data?.username} onChange={handleChange} name="username" required/>
                            
                            <Input placeholder="Insira a sua password" type="text" value={data?.password} onChange={handleChange} name="password" required/>
                        
                        </div>
                        
                        <Button text="Criar conta" type="submit" />

                        <Link to={"/"}><Text text="Tenho uma conta. Logar"/></Link>

                        <p className="text-[11pt] text-[gray] font-[400] text-center">{year} @ todos os direitos reservados a STETMENT MC</p>

                    </form>
                </div>
            </div>

        </div>
    )

} 