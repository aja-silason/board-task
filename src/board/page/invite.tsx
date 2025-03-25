import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-board.png";
import { Button } from "../components/button/button";
import { Text } from "../components/text/text";


export function Invite(){

    const navigate = useNavigate();

    return (

        <div className="h-[100vh] flex flex-col gap-[1em] items-center justify-center">

            <img src={logo} alt="Board" className="w-[20%]"/>
            
            
            <Text text="JAIr Bolsonaro convidou-o para um novo quadro"/>
            
            <div className="text-center">
                <Text text="QUADRO"/>
                <Text text="Quadro Eclesios pro" style={{fontWeight: 800, fontSize: "14pt"}}/>
            </div>

            <Text text="Click no botão abaixo"/>

            <div className="flex justify-between w-[20%]">
                <Button text="Recusar Convite" style={{backgroundColor: "red", cursor: "cursor-pointer"}} onClick={() => navigate("/home", {replace: true})}/>
                <Button text="Aceitar Convite" style={{cursor: "cursor-pointer"}}/>
            </div>

            
        </div>

    )

}