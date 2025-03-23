import { ReactNode } from "react"

type props = {
    icon: ReactNode,
    onClick?: VoidFunction,
    hoverMessage: string
}

export const IconNotification = ({icon, hoverMessage, onClick}: props) => {

    return (
        <button title={hoverMessage} type="button" className={`flex items-center justify-center border p-[.4em] gap-[1em] rounded-[10em] hover:bg-black hover:text-white transition`} onClick={onClick}>
            {icon}
        </button>
    )

}