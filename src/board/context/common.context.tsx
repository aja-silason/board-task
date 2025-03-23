import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

type CommomProps = {
    filter: string,
    setFilter: Dispatch<React.SetStateAction<string>>;
    handleIsFirst: VoidFunction;
    handleIsSecond: VoidFunction;
    handleIsThird: VoidFunction;
    handleIsFourth: VoidFunction;
    isfirst: boolean;
    setIsFirst: Dispatch<SetStateAction<boolean>>;
    isSecond: boolean;
    setIsSecond: Dispatch<SetStateAction<boolean>>;
    isThird: boolean;
    setIsThird: Dispatch<SetStateAction<boolean>>;
    isFourth: boolean;
    setIsFourth: Dispatch<SetStateAction<boolean>>;
}

const CommomContext = createContext<CommomProps | undefined>(undefined);

export const CommomProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [filter, setFilter] = useState<string>("");
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
    


    return (
        <CommomContext.Provider value={{filter, setFilter, handleIsFirst, handleIsFourth, handleIsSecond, handleIsThird, isfirst, isFourth, isSecond, isThird, setIsFirst, setIsFourth, setIsSecond, setIsThird}}>
            {children}
        </CommomContext.Provider>
    )
}

export const useCommom = () => {
    const context = useContext(CommomContext);
    if(!context){
        throw new Error("The context must be inside to provider");
    }

    return context;
}