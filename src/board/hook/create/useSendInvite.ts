import { addDoc, collection } from "firebase/firestore";
import { useState } from "react"
import { toast } from "sonner";
import { db } from "../../../firebase.config";

type props = {
    board: string,
    boardId: string,
    participantId: string,
    ownerId: string,
    owner: string,
    createdAt: any,
    updatedAt: any
}

export const useSendInvite = (boardData: any, recieverData: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const user = localStorage.getItem("userData");
    const parsedData = user && JSON.parse(user);

    const handleSendInvite = async () => {

        setIsLoading(true);
        try {
            
            const payload: props = {
                participantId: recieverData?.uid,
                board: boardData?.title,
                boardId: boardData?.id,
                ownerId: parsedData?.uid,
                owner: parsedData?.email,
                updatedAt: new Date(),
                createdAt: new Date(),
            }

            const isValidate: Array<keyof props> = ["board", "createdAt", "owner", "ownerId", "participantId", "updatedAt"];
            for(const key of isValidate){
                const value = payload[key];
                if(value == undefined || value == null) {
                    toast.warning(`Preencha todos os dados ${key}`, {duration: 3000});
                    return;
                }
            }

            const invite_fs = collection(db, 'invites');

            await addDoc(invite_fs, payload);

            setIsLoading(false)

            toast.success("Convite enviado");

        } catch (error) {
            console.log(error);
            toast.warning("Não foi possível enviar o convite, tente mais tarde");
        } finally {
            setIsLoading(false);
        }
    }

    return{isLoading, handleSendInvite}
}