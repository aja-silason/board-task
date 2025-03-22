import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth, facebookProvider, githubProvider, googleProvider } from "../../../firebase.config";
//import {} from ;

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

    const handleLoginWithGoogle = async () => {

        try {
            
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;

            console.log("User", user);

            navigate("/home", {replace: true});

        } catch (error) {
            console.log(error)
            toast.warning("Erro ao autenticar o usuário da google, tente novamente mais tarde", {duration: 3000});
        }
    }

    const handleLoginFacebook = async () => {
        try {

            const res = await signInWithPopup(auth, facebookProvider)
            const user = res.user;
            
            console.log("User gitub", user);
            
            navigate("/home", {replace: true})
            
        } catch (error) {
            console.log(error)
            toast.warning("Erro ao autenticar o usuário com o Facebook, tente novamente mais tarde", {duration: 3000})
        }
    }

    const handleLoginGithub = async () => {
        try {
            
            const res = await signInWithPopup(auth, githubProvider)
            const user = res.user;

            console.log("User gitub", user);

            navigate("/home", {replace: true})

        } catch (error) {
            console.log(error)
            toast.warning("Erro ao autenticar o usuário com o GitHub, tente novamente mais tarde", {duration: 3000});
        }
    }

    return {data, isLoading, handleChange, handleSubmit ,handleLoginWithGoogle, handleLoginFacebook, handleLoginGithub}
}