import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner";
import { db } from "../../../firebase.config";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

type props = {
    title: string,
    status: string,
    doing_id: string,
    comments: string[],
    createdAt?: any,
    boardId: string | any,
}

export const useCreateTask = () => {

    const [data, setData] = useState<props>({title: "", comments: [], doing_id: "", status: "", createdAt: "" , boardId: ""});
    const [isLoading, setIsLoading] = useState<boolean>();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e?.target;
        setData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    const {id: boardIds} = useParams();

    //const api_url = import.meta.env.VITE_FB_DATABASE_URL;

    const user = localStorage.getItem("userData");
    const parsedData = user && JSON.parse(user);

    const associateTaskIntoBoard = async (boardId: any, taskId: string) => {

        try {
            
            const task_reference = doc(db, 'boards', boardId);
            await updateDoc(task_reference, {
                task: arrayUnion(taskId)
            })

        } catch (error) {
            console.log(error)
            toast.warning(`Não foi possível associar a tarefa ao Quadro`, {duration: 3000});
        }

    }

    /*
    const associateTasksIntoBoards = async (taskId: any) => {

        try {
            
            const board_datas = await getDocs(collection(db, 'boards'));
            board_datas?.forEach( async (board: any) => {
                const boardsId = board?.id;
                await associateTaskIntoBoard(boardsId, taskId);
            });

            //toast.warning(`Tarefa Associada`, {duration: 3000});

        } catch (error) {
            console.log(error)

            toast.warning(`Não foi possivel associar`, {duration: 3000});
        }

    }*/

    const handleSubmit = async (e: FormEvent) => {
        e?.preventDefault();

        setIsLoading(true)


        try {

            const payload: props = {
                boardId: boardIds,
                title: data?.title,
                comments: [],
                doing_id: parsedData?.uid,
                status: 'pendente',
                createdAt: new Date()
            }

            const isValidate: Array<keyof props> = ["title"];
            for(const key of isValidate){
                const value = payload[key];
                if(value == undefined || value == null) {
                    toast.warning("Preencha todos os dados", {duration: 3000});
                    return;
                }
            }


            const board_store_fs = collection(db, 'tasks');

            
            const document_ref = await addDoc(board_store_fs, payload);

            const idTasks = document_ref?.id;

            await associateTaskIntoBoard(boardIds, idTasks)

            toast.success("Tarefa criada com sucesso", {duration: 3000});

            setData({title: "", comments: [], doing_id: "", status: "", createdAt: "" , boardId: ""})

            setIsLoading(false)


        } catch (error) {
            console.log(error)

            toast.warning("Não foi possivel criar a tarefa", {duration: 3000});
        } finally {
            setIsLoading(false);
        }

        

    }

    return {handleChange, data, isLoading, handleSubmit}

}