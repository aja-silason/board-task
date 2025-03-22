import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type props = {
    email: string,
    password: string
}

export const useLogin = () => {

    const [data, setData] = useState<props>({email: "", password: ""});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e?.target;

        setData((prevState) => ({
            ...prevState, [name]: value
        }));

    }

    const handleSubmit = async (e: FormEvent) => {

        e?.preventDefault();

        setIsLoading(true);
        try {
            
            const payload: props = {
                email: data?.email,
                password: data?.password
            }

            const isValidate: Array<keyof props> = ["email", "password"];
            for(const key of isValidate){
                const value = payload[key];
                if(value == undefined || value == null || value?.trim() == ""){
                    toast.warning(`${key == "email" ? "Email" : key == "password" ? "Palavra passe" : value} precisa ser preenchido`, {
                        duration: 3000
                    });
                    return;
                }
            }

            navigate('/home', { replace: true });    
            console.log("DATA", payload);


            setIsLoading(false);
            toast.success("Login efectuado com sucesso", {
                duration: 2000
            })


        } catch (error) {
            toast.warning("Algo ocorreu mal. Estamos resolvendo por você", {
                duration: 3000
            });
        } finally {
            setIsLoading(false)
        }

    }

    return {data, isLoading, handleChange, handleSubmit}
}