import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth, db } from "../../../firebase.config";
import { useAuth } from "../../context/auth.context";
import { doc, setDoc } from "firebase/firestore";

type props = {
    email: string,
    password: string,
    username: string,
}

export const useCreateAccount = () => {

    const [data, setData] = useState<props>({email: "", password: "", username: ""});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const {setUser} = useAuth();

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
                password: data?.password,
                username: data?.username
            }

            const isValidate: Array<keyof props> = ["email", "password", "username"];
            for(const key of isValidate){
                const value = payload[key];
                if(value == undefined || value == null || value?.trim() == ""){
                    toast.warning(`${key == "email" ? "Email" : key == "password" ? "Palavra passe" : value} precisa ser preenchido`, {
                        duration: 3000
                    });
                    return;
                } else if(payload.password?.length < 6){
                    toast.warning(`${payload.password && "Palavra passe"} precisa ter 6 ou mais caracteres`, {
                        duration: 3000
                    });
                    return;
                }
            }

            const result = await createUserWithEmailAndPassword(auth, payload?.email, payload?.password);

            const user: any = result?.user

            const user_store_fs =  doc(db, 'users', user?.uid);
            
            await setDoc(user_store_fs, {
                uid: user?.uid,
                email: user?.email,
                username: data?.username,
                authType: 'email',
                createdAt: new Date(),
            });

            
            localStorage?.setItem("userData", JSON.stringify(user));

            setUser(user);

            navigate('/home', { replace: true }); 

            setIsLoading(false);
            toast.success("Conta criada com sucesso", {
                duration: 2000
            })


        } catch (error: any) {

            console.log(error)

            if(error?.message?.includes("auth/email-already-in-use")){
                toast.warning("Este e-mail não está disponível, tente outro", {
                    duration: 3000
                });    
                return;
            }

            toast.warning("Algo ocorreu mal. Estamos resolvendo por você", {
                duration: 3000
            });
        } finally {
            setIsLoading(false)
        }

    }

    return {data, isLoading, handleChange, handleSubmit}
}
