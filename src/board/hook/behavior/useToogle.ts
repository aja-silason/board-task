import { useState } from "react"

export const useToogle = () => {

    const [isfirst, setIsFirst] = useState<boolean>(true);
    const [isSecond, setIsSecond] = useState<boolean>(false);
    const [isThird, setIsThird] = useState<boolean>(false);
    const [isFourth, setIsFourth] = useState<boolean>(false);

    const handleIsFirst = () => {
        setIsFirst(true);
        setIsSecond(false);
        setIsThird(false);
        setIsFourth(false);
    }

    const handleIsSecond = () => {
        setIsSecond(true);
        setIsFirst(false);
        setIsThird(false);
        setIsFourth(false);

    }

    const handleIsThird = () => {
        setIsThird(true);
        setIsFirst(false);
        setIsSecond(false);
        setIsFourth(false);
    }

    const handleIsFourth = () => {
        setIsFourth(true);
        setIsFirst(false);
        setIsSecond(false);
        setIsThird(false);
    }

    return {isfirst, isSecond, isThird, isFourth,handleIsFirst, handleIsSecond, handleIsThird, handleIsFourth}

}