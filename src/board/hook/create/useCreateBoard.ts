import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner";
import { db } from "../../../firebase.config";
import { addDoc, collection } from "firebase/firestore";

type props = {
    boardId?: string,
    title: string,
    description: string,
    ownerId?: string,
    tag: string[],
    participants: string[],
    tasks: string[],
    createdAt: any,
    updatedAt: any,
    status: string
}

export const useCreateBoard = () => {

    const [data, setData] = useState<props>({title: "", description: "", participants: [], status: "", tasks: [], boardId: "", ownerId: "", tag: [], updatedAt: "", createdAt: ""});
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

    const handleSubmit = async (e: FormEvent) => {
        e?.preventDefault();

        setIsLoading(true)

        try {

            const payload: props = {
                boardId: crypto?.randomUUID(),
                title: data?.title,
                description: data?.description,
                ownerId: parsedData?.uid,
                participants: [parsedData?.uid],
                status: 'open',
                tag: ['Quadro'],
                tasks: [],
                updatedAt: new Date(),
                createdAt: new Date(),
            }

            const isValidate: Array<keyof props> = ["title", "description"];
            for(const key of isValidate){
                const value = payload[key];
                if(value?.trim() == "" || value == undefined || value == null) {
                    toast.warning("Preencha todos os dados", {duration: 3000});
                    return;
                }
            }

            /*const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            }*/
            
            //const res = await axios.post(`${api_url}titles.json`, payload);

            const board_store_fs = collection(db, 'boards');
            //const board_store_fs = doc(db, 'boards', parsedData?.uid);

            await addDoc(board_store_fs, payload);
            //await setDoc(board_store_fs, payload);

            toast.success("Tarefa criada com sucesso", {duration: 3000});

            setIsLoading(false)

        } catch (error) {
            toast.warning("Não foi possivel criar a tarefa", {duration: 3000});
        } finally {
            setIsLoading(false);
        }

    }

    return {handleChange, data, isLoading, handleSubmit}

}