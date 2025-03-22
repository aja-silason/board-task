import React, { createContext, Dispatch, ReactNode, useContext, useState } from "react"

type AuthContextProps = {
    theme: any,
    setTheme: Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<AuthContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [theme, setTheme] = useState<string>("light");

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("The context must be inside to provider");
    }

    return context;
}