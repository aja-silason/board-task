import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "../../../firebase.config";

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

            const res = await signInWithEmailAndPassword(auth, payload?.email, payload?.password);

            localStorage?.setItem("userData", JSON.stringify(res?.user));

            navigate("/home", {replace: true});

            console.log(res.user);

            setIsLoading(false);
            toast.success("Login efectuado com sucesso", {
                duration: 2000
            })

            setData({email: "", password: ""})

        } catch (error: any) {

            if(error?.code?.includes("auth/invalid-credential")){
                toast.warning("Credênciais incorrectas", {duration: 3000});
                return;
            }
            
        } finally {
            setIsLoading(false)
        }

    }

    return {data, isLoading, handleChange, handleSubmit}
}