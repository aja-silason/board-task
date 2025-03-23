import { BuildingOffice, Table, UsersThree } from "@phosphor-icons/react"
import { ReactNode } from "react"
import { InnerTabButton } from "../../button/inner.tab.button"
import { useCommom } from "../../../context/common.context"

type menuProps = {
    to: VoidFunction,
    where: boolean,
    icon: ReactNode,
    menutext: string
}
export const InnerTaskSideBar = () => {

    const {isfirst, isSecond, isThird, handleIsFirst, handleIsSecond, handleIsThird} = useCommom();

    const menu: menuProps[] = [
        {to: () => handleIsFirst(), where: isfirst, icon: <BuildingOffice size={20}/>, menutext: "Tarefa"},
        {to: () => handleIsSecond(), where: isSecond, icon: <Table size={20}/>, menutext: "Quadro"},
        {to: () => handleIsThird(), where: isThird, icon: <UsersThree size={20}/>, menutext: "Participantes"},
    ] 

    return (
        <div className="border w-[15%] md:h-[92vh] px-[.4em] pt-[1em] flex flex-col gap-[.5em] bg-white">
            
            {
                menu?.map((menu: menuProps) => {
                    return (
                        <InnerTabButton icon={menu?.icon} title={menu?.menutext} onClick={menu?.to} isActive={menu?.where} key={1} />
                    )
                })
            }
        </div>
    )

}
