import { BuildingOffice, Table, UsersThree } from "@phosphor-icons/react"
import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { useToogle } from "../../../hook/behavior/useToogle"
import { TabButton } from "../../button/tab.button"

type menuProps = {
    to: VoidFunction,
    where: boolean,
    icon: ReactNode,
    menutext: string
}
export const InnerTaskSideBar = () => {

    const {isfirst, isSecond, isThird, handleIsFirst, handleIsSecond, handleIsThird} = useToogle();

    const menu: menuProps[] = [
        {to: () => handleIsFirst(), where: isfirst, icon: <BuildingOffice size={20}/>, menutext: "Tarefa"},
        {to: () => handleIsSecond(), where: isSecond, icon: <Table size={20}/>, menutext: "Quadro"},
        {to: () => handleIsThird(), where: isThird, icon: <UsersThree size={20}/>, menutext: "Participantes"},
    ] 

    const location = useLocation();

    return (
        <div className="border w-[15%] md:h-[92vh] px-[.4em] pt-[1em] flex flex-col gap-[.5em] bg-white">
            
            {
                menu?.map((menu: menuProps) => {

                    const isActive = 0;

                    return (

                        <TabButton title={menu?.menutext} onClick={menu?.to} isActive={menu?.where} key={1} />

                    )
                })
            }

        </div>
    )

}


{/*
    <nav>
        <li className={`flex ${isActive ? 'bg-[#000]' : 'bg-white text-[#444]'} text-white p-[.5em] font-[600] rounded-[.3em] gap-[.5em]`}>
            <div className="w-[.2em] rounded-[.5em] bg-[#fff]"></div>
            <div className="flex gap-[.3em] items-center">
                {menu?.icon}
                <p className="">{menu?.menutext}</p>
            </div>
        </li>

    </nav>
*/}