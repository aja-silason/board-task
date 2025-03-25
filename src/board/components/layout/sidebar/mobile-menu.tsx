import { BuildingOffice, DeviceTabletSpeaker, SignOut } from "@phosphor-icons/react"
import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { useLogOut } from "../../../hook/auth/useLogOut"

type menuProps = {
    to: string,
    icon: ReactNode,
    menutext: string
}

type props = {
    style: any
}
export const SideBarMobile = ({style}: props) => {


    const menu: menuProps[] = [
        {to: "/home", icon: <BuildingOffice size={20}/>, menutext: "Início"},
        {to: "/tasks", icon: <DeviceTabletSpeaker size={20}/>, menutext: "Tarefas"},
    ] 

    

    const location = useLocation();

    const {handleSigOut} = useLogOut();

    return (
        <div className={`border-t md:w-[18%] md:h-[65px] fixed bottom-0 w-full px-[.4em] pt-[1em] flex flex-col gap-[.5em] bg-white ${style}`}>

            <nav className="flex flex-row h-[90%] justify-between">

                <div className="flex flex-row w-full justify-between px-[2em] gap-[2em]">
                    {
                        menu?.map((menu: menuProps) => {

                            const isActive = location?.pathname === menu?.to;

                            return (
                                    <Link to={menu?.to}>
                                        <li className={`flex ${isActive ? 'bg-[#000] text-white' : 'bg-white text-[#444]'}  p-[.5em] font-[600] rounded-[.3em] gap-[.5em]`}>
                                            <div className="flex gap-[.3em] items-center">
                                                {menu?.icon}
                                            </div>
                                        </li>
                                    </Link>
                            )
                        })
                    }

                    <button type="button" onClick={handleSigOut}>
                        <li className={`flex hover:bg-[#000] hover:text-white text-[#444]  p-[.5em] font-[600] rounded-[.3em] gap-[.5em]`}>
                            <div className={`w-[.2em] rounded-[.5em] bg-[#fff]`}></div>
                            <div className="flex gap-[.3em] items-center">
                                <SignOut size={20}/>
                            </div>
                        </li>
                    </button>
                </div>

        </nav>

        </div>
    )

}