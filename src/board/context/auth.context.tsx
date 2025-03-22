import React, { createContext, Dispatch, ReactNode, useContext, useState } from "react"

type AuthProps = {
    user: any,
    setUser: Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [user, setUser] = useState<any>(null);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("The context must be inside to provider");
    }

    return context;
}