import { useNavigate } from "react-router-dom"

export const useInternNavigation = () => {

    const navigate = useNavigate();

    const handleNavigateToProfileTask = (idTask: number) => {
        navigate(`/task/${idTask}`)
    }

    return {handleNavigateToProfileTask}

}