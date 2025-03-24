import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { toast } from "sonner";
import { useState } from "react";

export const useMoveTask = (taskId: string) => {

    const [isLoading, setIsLoading] = useState<boolean>(false); 


    const updateState = async (status: string) => {

        setIsLoading(true);
        try {
            
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                status: status
            })

            toast.success("Mudou de estado");
            setIsLoading(false)
        } catch (error) {
            toast.warning("Não Mudou de estado");
        } finally{
            setIsLoading(false)
        }
    }

    return {updateState, isLoading}

}