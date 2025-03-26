import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo-board.png";
import { Button } from "../components/button/button";
import { Text } from "../components/text/text";
import { useAcceptInvite } from "../hook/create/useAcceptInvite";


export function Invite(){

    const navigate = useNavigate();

    const {data} = useParams();

    const parsedInvite = data && JSON.parse(data);

    const justName = parsedInvite?.owner?.split('@')[0];

    const {handleAcceptInvite, isLoading} = useAcceptInvite(parsedInvite);

    return (

        <div className="h-[100vh] flex flex-col gap-[1em] items-center justify-center">

            <img src={logo} alt="Board" className="w-[20%]"/>
            
            
            <Text text={` ${justName} convidou-o para um novo quadro`}/>
            
            <div className="text-center">
                <Text text="QUADRO"/>
                <Text text={parsedInvite?.board} style={{fontWeight: 800, fontSize: "14pt"}}/>
            </div>

            <Text text="Click no botão abaixo"/>

            <div className="flex justify-between w-[20%]">
                <Button text="Recusar Convite" style={{backgroundColor: "red", cursor: "cursor-pointer"}} onClick={() => navigate("/home", {replace: true})}/>

                <Button text="Aceitar Convite" style={{cursor: "cursor-pointer"}} onClick={handleAcceptInvite} isLoading={isLoading}/>
            </div>

            
        </div>

    )

}