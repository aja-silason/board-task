import { signOut } from "firebase/auth"
import { auth } from "../../firebase.config"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth.context"
import { Container } from "../components/layout/conatiner"
import { useCommom } from "../context/common.context"
import { Button } from "../components/button/button"

export function Home(){

    const navigate = useNavigate();
    const {setUser} = useAuth();

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

    const {filter} = useCommom();

    return (
        <Container>
            <p>Home Screen {filter}</p>
                <Button text="Terminar Sessão" onClick={handleSigOut}/>
        </Container>
    )

}