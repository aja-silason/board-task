import { signOut } from "firebase/auth"
import { auth } from "../../firebase.config"
import { toast } from "sonner"
import { Button } from "../components/button/button"
import { useNavigate } from "react-router-dom"

export function Home(){

    const navigate = useNavigate();

    const handleSigOut = async () => {
        
        try {

            await signOut(auth)
            localStorage.clear();
            navigate("/", {replace: true})

        } catch (error) {
            toast.warning("Não foi possível terminar sessão, estamos resolvendo por você", {duration: 3000});

        }
    }


    return (
        <div>

            Manager Home

            <Button text="Terminar Sessão" onClick={handleSigOut}/>

        </div>
    )

}