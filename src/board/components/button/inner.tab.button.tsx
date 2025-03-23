import { ReactNode } from "react"

type tabButtonProps = {
    icon: ReactNode,
    title: string,
    onClick: VoidFunction,
    isActive: boolean
}
export const InnerTabButton = ({icon, title, isActive, onClick}: tabButtonProps) => {
    return (
        <button type="button" onClick={onClick} className={`${isActive ? "bg-black text-[#fff] font-semibold" : "bg-[#eee] text-[#000]"} text-[10pt] p-[.5em] rounded-[.3em] flex gap-[.5em]`}>
            {isActive && <div className="w-[.2em] bg-[#fff]"></div>}
            
            <div className="flex gap-[.2em]">
                {icon}
                <span>{title}</span>
            </div>
        </button>
    )
}