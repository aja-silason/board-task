import { BuildingOffice } from "@phosphor-icons/react"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

type menuProps = {
    to: string,
    icon: ReactNode,
    menutext: string
}
export const SideBar = () => {

    const menu: menuProps[] = [
        {to: "/home", icon: <BuildingOffice size={20}/>, menutext: "Início"},
    ] 

    return (
        <div className="border w-[15%] md:h-[92vh] px-[.4em] pt-[1em] flex flex-col gap-[.5em]">
            
            {
                menu?.map((menu: menuProps) => {
                    return (
                        <Link to={menu?.to}>
                            <div className={`flex bg-[#000] text-white p-[.5em] rounded-[.3em] gap-[.5em]`}>
                                <div className="w-[.2em] rounded-[.5em] bg-[#fff]">.</div>
                                <div className="flex gap-[.3em] items-center">
                                    {menu?.icon}
                                    <p className="">{menu?.menutext}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }

        </div>
    )

}