import { ReactNode } from "react"
import { Text } from "../text/text";
import { InnerTaskSideBar } from "./sidebar/inner-sidebarr";

type props = {
    children: ReactNode;
}

export const InnerTaskContainer = ({children}: props) => {
    return (
        <div className="flex flex-col gap-[1em]">

            <Text text="Nome da Tarefa" style={{fontSize: "14pt", fontWeight: "700"}}/>
            
            <div className="flex gap-[1em] bg-white">
                <InnerTaskSideBar/>
                <div className="p-[1em] w-full bg-white border h-[80vh] flex-wrap overflow-auto rounded-[.5em]">
                    {children}
                </div>
            </div>
        </div>
    )
}