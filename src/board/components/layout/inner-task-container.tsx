import { ReactNode } from "react"
import { NavBar } from "./navbar";
import { SideBar } from "./sidebar";
import { Text } from "../text/text";

type props = {
    children: ReactNode;
}

export const InnerTaskContainer = ({children}: props) => {
    return (
        <div className="flex flex-col">

            <Text text="Tarefa"/>
            
            <div className="flex gap-[1em] h-full bg-white">
                <SideBar/>
                
                <div className="p-[1em] w-full bg-white">
                    {children}
                </div>
            </div>
        </div>
    )
}