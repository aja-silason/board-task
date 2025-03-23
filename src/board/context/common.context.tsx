import React, { createContext, Dispatch, ReactNode, useContext, useState } from "react"

type CommomProps = {
    filter: string,
    setFilter: Dispatch<React.SetStateAction<any>>;
}

const CommomContext = createContext<CommomProps | undefined>(undefined);

export const CommomProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [filter, setFilter] = useState<string>("");


    return (
        <CommomContext.Provider value={{filter, setFilter}}>
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