import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "../../../firebase.config";

type props = {
    email: string,
    password: string
}

export const useCreateAccount = () => {

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
                } else if(payload.password?.length < 6){
                    toast.warning(`${payload.password && "Palavra passe"} precisa ter 6 ou mais caracteres`, {
                        duration: 3000
                    });
                    return;
                }
            }

            createUserWithEmailAndPassword(auth, payload?.email, payload?.password).then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            }).catch((error) => {
                const errorCode = error?.code;
                const errorMessage = error?.message;
                console.log(errorCode, errorMessage)
            })

            
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

/*
{
    "uid": "jUDmPet7WDhn9n22bHr2CNkDdNz1",
    "email": "teste@teste.com",
    "emailVerified": false,
    "isAnonymous": false,
    "providerData": [
        {
            "providerId": "password",
            "uid": "teste@teste.com",
            "displayName": null,
            "email": "teste@teste.com",
            "phoneNumber": null,
            "photoURL": null
        }
    ],
    "stsTokenManager": {
        "refreshToken": "AMf-vBxaU8vWML1-U182kly3AleNGmud3oimRO6ElVBX9EASez-ULf2x--tuuygOwl4tDLQesWfMfxrlumTcHp_8XS8HkLD3JQOaEuRzIhER7sG7Ptzhcvc8hmbTZQK8PEu9KFZTzbGj9-OSOloeW8CYMngFGcHav7hPU2L_W4ycIjk3njYG4dMeDzz_1M5VkSVT8qS_Wvum",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwYjIyMWFiNjU2MTdiY2Y4N2VlMGY4NDYyZjc0ZTM2NTIyY2EyZTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9yYWQtdGFzayIsImF1ZCI6ImJvcmFkLXRhc2siLCJhdXRoX3RpbWUiOjE3NDI2NjM0MDcsInVzZXJfaWQiOiJqVURtUGV0N1dEaG45bjIyYkhyMkNOa0RkTnoxIiwic3ViIjoialVEbVBldDdXRGhuOW4yMmJIcjJDTmtEZE56MSIsImlhdCI6MTc0MjY2MzQwNywiZXhwIjoxNzQyNjY3MDA3LCJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0ZUB0ZXN0ZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.NeXSiz0RyQFZYrm2mjvycYisIbhl646LAz_73uGCYpFppaQYhzgVshDZSYcSp2sJRI5XOW6AtD1Ve4WsQwYWd9UAwS_E7ymw2YR4Sd-f03sAavg4sCJtpyvZ1tXTrdJ1zXDi3PoWdKsPCHW8-ytEYvzV-_SEYf84KZ0OYlwPigK0Bay2GpeLd0lU06TLCokpcmsyoChoLuRl-1fueDZekeDEkm-L_zAhHCd5OO7Hy4cWby5V2mGpUPOKLku7Ywby1n6m-o_2cFA-dT7ekH__4-oMFa0Gfu4Db_ekmWKo6Fsj26DqAbs79FWcEsMT2vyUh9SjXWBgqmjB12OMipnh5Q",
        "expirationTime": 1742667007403
    },
    "createdAt": "1742663406856",
    "lastLoginAt": "1742663406856",
    "apiKey": "AIzaSyCKnAYLcBWpvJwt-geUABAC-oD-hMXXWtQ",
    "appName": "[DEFAULT]"
}*/