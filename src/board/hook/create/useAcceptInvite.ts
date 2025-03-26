import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react"
import { toast } from "sonner";
import { db } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";

type props = {
    id: string,
    email: string
}

export const useAcceptInvite = (inviteData: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const user = localStorage.getItem("userData");
    const parsedData = user && JSON.parse(user);

    const navigate = useNavigate();

    const handleAcceptInvite = async () => {

        setIsLoading(true);
        try {
            
            const payload: props = {
                id: inviteData?.participantId,
                email: parsedData?.email
            }

            const isValidate: Array<keyof props> = [];
            for(const key of isValidate){
                const value = payload[key];
                if(value == undefined || value == null) {
                    toast.warning(`Preencha todos os dados ${key}`, {duration: 3000});
                    return;
                }
            }

            const invite_fs_reference = doc(db, 'boards', inviteData?.boardId);

            await updateDoc(invite_fs_reference, {
                participants: arrayUnion(payload)
            });

            toast.success("Convite aceite");
            setIsLoading(false);

            navigate(`/task/${inviteData?.boardId}`);
            

        } catch (error) {
            console.log(error);
            toast.warning("Não foi possível enviar o convite, tente mais tarde");
        } finally {
            setIsLoading(false);
        }
    }

    return{isLoading, handleAcceptInvite}
}