import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-board.png";

export const Invite = () => {

    const navigate = useNavigate();

    const handleStart = () => {
        localStorage.clear();
        navigate("/", {replace: true});    
    }

    return (
        <div className="h-[100vh] flex flex-col gap-[2em] items-center justify-center">

            <img src={logo} alt="Board" className="w-[20%]"/>

            <h2>404 - Página não encontrada</h2>
            <h2>Você não deveria estar aqui, por favor clique no link abaixo para prosseguir em segurança</h2>

            <button onClick={handleStart} className="text-[#264A7D] underline">Voltar</button>

        </div>
    )
}