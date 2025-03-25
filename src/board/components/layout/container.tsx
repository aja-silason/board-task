import { ReactNode } from "react"
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { SideBarMobile } from "./sidebar/mobile-menu";
import { NavBarMobile } from "./navbar/mobile-header";
import { useScreen } from "../../context/screen.context";

type props = {
    children: ReactNode;
}

export const Container = ({children}: props) => {

    const {isLargeScreen, isVisible} = useScreen();

    return (
        <div className="flex flex-col">
            
            <NavBar  style={`z-50 sx:absolute md:relative ${isVisible && !isLargeScreen ? 'block' : 'hidden'} md:flex`}/>
            
            <NavBarMobile style={`z-50 sx:absolute md:relative ${isVisible && !isLargeScreen ? 'block' : 'block'} md:hidden`}/>

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