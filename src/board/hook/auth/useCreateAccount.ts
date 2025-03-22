import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type props = {
    email: string,
    fullname: string,
    telephone: string,
    password: string,
    confirm_password: string,
}

export const useCreateAccount = () => {

    const [data, setData] = useState<props>({email: "", fullname: "", telephone: "", password: "", confirm_password: ""});
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
                fullname: data?.fullname,
                telephone: data?.telephone,
                password: data?.password,
                confirm_password: data?.confirm_password
            }

            const isValidate: Array<keyof props> = ["email", "password"];
            for(const key of isValidate){
                const value = payload[key];
                if(value == undefined || value == null || value?.trim() == ""){
                    toast.warning(`${key == "email" ? "Email" : key == "password" ? "Palavra passe" : value} precisa ser preenchido`, {
                        duration: 3000
                    });
                    return;
                } else if(payload.password !== payload.confirm_password){
                    toast.warning(`${payload.password && "Palavra passes"} não convergem`, {
                        duration: 3000
                    });
                    return;
                }
            }

            
            console.log("DATA", payload);
            
            localStorage.setItem("userdata", JSON.stringify(payload));

            navigate('/', { replace: true }); 

            setIsLoading(false);
            toast.success("Conta criada com sucesso", {
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