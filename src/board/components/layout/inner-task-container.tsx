import { ReactNode } from "react"
import { Text } from "../text/text";
import { InnerTaskSideBar } from "./sidebar/inner-sidebar";
import { useScreen } from "../../context/screen.context";
import { InnerTaskSideBarMobile } from "./sidebar/inner-sidebarMobile";

type props = {
    children: ReactNode;
    name_task?: string,
}

export const InnerTaskContainer = ({children ,name_task}: props) => {

    const {isLargeScreen, isVisible} = useScreen();

    return (
        <div className="flex flex-col gap-[1em]">

            <Text text={name_task ?? "Nome da Tarefa"} style={{fontSize: "14pt", fontWeight: "700"}}/>

            <div className={`${!isLargeScreen && isVisible ? 'md:flex' : 'md:hidden h-[10vh] w-full '}`}>
                    <InnerTaskSideBarMobile/>
            </div>

            <div className={`gap-[1em] bg-white ${!isLargeScreen && isVisible ? 'md:flex-col' : 'flex flow-col'}`}>
                <div className={`${!isLargeScreen && isVisible ? 'hidden md:hidden' : 'md:flex md:w-[20%] hidden'}`}>
                    <InnerTaskSideBar/>
                </div>

                <div className="p-[1em] md:w-full bg-white border md:h-[80vh] overflow-x-visible h-full flex-wrap overflow-auto rounded-[.5em]">
                    {children}
                </div>
            </div>
        </div>
    )
}