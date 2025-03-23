import { BuildingOffice } from "@phosphor-icons/react"
import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

type menuProps = {
    to: string,
    icon: ReactNode,
    menutext: string
}
export const SideBar = () => {

    const menu: menuProps[] = [
        {to: "/home", icon: <BuildingOffice size={20}/>, menutext: "Início"},
        {to: "/tasks", icon: <BuildingOffice size={20}/>, menutext: "Tarefas"},
    ] 

    const location = useLocation();

    return (
        <div className="border w-[15%] md:h-[92vh] px-[.4em] pt-[1em] flex flex-col gap-[.5em] bg-white">
            
            {
                menu?.map((menu: menuProps) => {

                    const isActive = location?.pathname === menu?.to;

                    return (

                        <nav>
                            <Link to={menu?.to}>
                                <li className={`flex ${isActive ? 'bg-[#000]' : 'bg-white text-[#444]'} text-white p-[.5em] font-[600] rounded-[.3em] gap-[.5em]`}>
                                    <div className="w-[.2em] rounded-[.5em] bg-[#fff]"></div>
                                    <div className="flex gap-[.3em] items-center">
                                        {menu?.icon}
                                        <p className="">{menu?.menutext}</p>
                                    </div>
                                </li>
                            </Link>


                        </nav>


                    )
                })
            }

        </div>
    )

}