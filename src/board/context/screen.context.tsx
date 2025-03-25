import React, { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react"

type ScreenContextProps = {
    isVisible: boolean,
    setIsVisible: Dispatch<React.SetStateAction<boolean>>,
    isLargeScreen: boolean,
    setIsLargeScreen: Dispatch<React.SetStateAction<boolean>>
}

const ScreenContext = createContext<ScreenContextProps | undefined>(undefined);

export const ScreenProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [isVisible, setIsVisible] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 850){
                setIsLargeScreen(false);
                setIsVisible(true);
                return;
            }
            setIsVisible(false);

            handleResize();

            document.addEventListener("resize", handleResize);

            return () => document.addEventListener("resize", handleResize);
        }
    }, []);
    
    return (
        <ScreenContext.Provider value={{isVisible, isLargeScreen, setIsLargeScreen, setIsVisible}}>
            {children}
        </ScreenContext.Provider>
    )
}

export const useScreen = () => {
    const context = useContext(ScreenContext);
    if(!context){
        throw new Error("The context must be inside to provider");
    }

    return context;
}