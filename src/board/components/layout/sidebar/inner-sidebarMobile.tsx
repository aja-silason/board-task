import { Table, UsersThree } from "@phosphor-icons/react"
import { ReactNode } from "react"
import { InnerTabButton } from "../../button/inner.tab.button"
import { useCommom } from "../../../context/common.context"

type menuProps = {
    to: VoidFunction,
    where: boolean,
    icon: ReactNode,
    menutext: string
}
export const InnerTaskSideBarMobile = () => {

    const {isfirst, isSecond, handleIsFirst, handleIsSecond} = useCommom();

    const menu: menuProps[] = [
        {to: () => handleIsFirst(), where: isfirst, icon: <Table size={20}/>, menutext: "Quadro"},
        {to: () => handleIsSecond(), where: isSecond, icon: <UsersThree size={20}/>, menutext: "Team"},
        //{to: () => handleIsThird(), where: isThird, icon: <BuildingOffice size={20}/>, menutext: "Participantes"},
    ] 

    return (
        <div className="w-full px-[.4em] pt-[1em] flex flex-row gap-[.8em] bg-white">
            
            {
                menu?.map((menu: menuProps, index: number) => {
                    return (
                        <InnerTabButton icon={menu?.icon} title={menu?.menutext} onClick={menu?.to} isActive={menu?.where} key={index} />
                    )
                })
            }
        </div>
    )

}
