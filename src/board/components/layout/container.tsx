import { ReactNode, useEffect, useState } from "react"
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { SideBarMobile } from "./sidebar/mobile-sidebar";

type props = {
    children: ReactNode;
}

export const Container = ({children}: props) => {

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
        <div className="flex flex-col">
            <NavBar/>
            <div className="flex gap-[1em] h-full bg-white">
                
                <SideBar style={`z-50 sx:absolute md:relative ${isVisible && !isLargeScreen ? 'block' : 'hidden'} md:block`}/>

                <SideBarMobile style={`z-50 sx:absolute md:relative ${isVisible && !isLargeScreen ? 'block' : 'block'} md:hidden`}/>

                <div className="p-[1em] w-full bg-white">
                    {children}
                </div>
            </div>
        </div>
    )
}