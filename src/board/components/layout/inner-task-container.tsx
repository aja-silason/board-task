import { ReactNode } from "react"
import { SideBar } from "./sidebar";
import { Text } from "../text/text";
import { InnerTaskSideBar } from "./sidebar/inner-sidebarr";

type props = {
    children: ReactNode;
}

export const InnerTaskContainer = ({children}: props) => {
    return (
        <div className="flex flex-col">

            <Text text="Nome da Tarefa"/>
            
            <div className="flex gap-[1em] h-full bg-white">
                <InnerTaskSideBar/>
                <div className="p-[1em] w-full bg-white">
                    {children}
                </div>
            </div>
        </div>
    )
}