import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { auth } from "../../../firebase.config";
import { toast } from "sonner";

export const useLogOut = () => {

    const {setUser} = useAuth();
    
    const navigate = useNavigate();

    const handleSigOut = async () => {
        
        try {

            await signOut(auth)
            localStorage.clear();
            setUser(null);
            navigate("/", {replace: true})

        } catch (error) {
            toast.warning("Não foi possível terminar sessão, estamos resolvendo por você", {duration: 3000});

        }
    }

    return {handleSigOut}
}