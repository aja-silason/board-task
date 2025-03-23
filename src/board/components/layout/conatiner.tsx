import { ReactNode } from "react"
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";

type props = {
    children: ReactNode;
}

export const Container = ({children}: props) => {
    return (
        <div className="flex flex-col">
            <NavBar/>
            <div className="flex gap-[1em]">
                <SideBar/>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}