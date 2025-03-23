import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react"
import { auth } from "../../firebase.config";

type AuthProps = {
    user: any,
    setUser: Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [user, setUser] = useState<any>(null);
    
    const userStorage = localStorage.getItem("userData")
    const parsedUser = userStorage && JSON.parse(userStorage);

    useEffect(() => {
        setUser(parsedUser)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(parsedUser){
            console.log("Aquele", parsedUser, user)
                setUser(parsedUser);
                return;
            }
            setUser(null)
        });

        return () => unsubscribe();

    }, [])


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