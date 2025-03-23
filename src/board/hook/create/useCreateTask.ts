import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner";
import axios from "axios";

type props = {
    task: string
}

export const useCreateTask = () => {

    const [data, setData] = useState<props>({task: ""});
    const [isLoading, setIsLoading] = useState<boolean>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e?.target;
        setData((prevState) => ({
            ...prevState, [name]: value
        }));
    }

    const api_url = import.meta.env.VITE_FB_DATABASE_URL;

    const handleSubmit = async (e: FormEvent) => {
        e?.preventDefault();


        try {

            const payload: props = {
                task: data?.task
            }

            const isValidate: Array<keyof props> = ["task"];
            for(const key of isValidate){
                const value = payload[key];
                if(value?.trim() == "" || value == undefined || value == null) {
                    toast.warning("Preencha todos os dados", {duration: 3000});
                    return;
                }
            }
            
            await axios.post(`${api_url}/tasks`, payload);
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