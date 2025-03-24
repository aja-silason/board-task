import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner";
import { db } from "../../../firebase.config";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

type props = {
    commentsId?: string,
    comment?: string,
    userId?: string,
    taskId?: string
    createdAt?: Date | any,
    updatedAt?: Date | any
}


export const useCreateComment = (dt: any) => {

    const [data, setData] = useState<props>({comment: ""});
    const [isLoading, setIsLoading] = useState<boolean>();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e?.target;
        setData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    //const api_url = import.meta.env.VITE_FB_DATABASE_URL;

    const user = localStorage.getItem("userData");
    const parsedData = user && JSON.parse(user);


    const associateCommentIntoTask = async (taskId: any, commentId: string) => {
    
            try {
                
                const coment_reference = doc(db, 'tasks', taskId);
                await updateDoc(coment_reference, {
                    comments: arrayUnion(commentId)
                })
    
            } catch (error) {
                console.log(error)
                toast.warning(`Não foi possível associar o comentário a tarefa`, {duration: 3000});
            }
    
        }



    const handleSubmit = async (e: FormEvent) => {
        e?.preventDefault();

        setIsLoading(true)

        try {

            const payload: props = {
                comment: data?.comment,
                taskId: dt?.id,
                userId: parsedData?.uid,
                updatedAt: new Date(),
                createdAt: new Date(),
            }

            const isValidate: Array<keyof props> = ["comment"];
            for(const key of isValidate){
                const value = payload[key];
                if(value?.trim() == "" || value == undefined || value == null) {
                    toast.warning(`Preencha todos os dados ${key}`, {duration: 3000});
                    return;
                }
            }

            const comment_store_fs = collection(db, 'comments');

            const coment_ref = await addDoc(comment_store_fs, payload);

            const idComment = coment_ref.id;

            await associateCommentIntoTask(dt?.id, idComment);

            toast.success("Comentário adicionado", {duration: 3000});

            setIsLoading(false)

            setData({comment: ""});

        } catch (error) {
            toast.warning("Não foi possivel comentar", {duration: 3000});
        } finally {
            setIsLoading(false);
        }

    }

    return {handleChange, data, isLoading, handleSubmit}

}