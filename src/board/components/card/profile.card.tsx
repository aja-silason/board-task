import { ReactNode } from "react"

type props = {
    children?: ReactNode,
    onClick?: VoidFunction,
    hoverMessage: string
}

export const ProfileCard = ({children, hoverMessage, onClick}: props) => {

    return (
        <button title={hoverMessage} type="button" className={`flex items-center justify-center gap-[1em] rounded-[10em] text-center hover:bg-black w-[2.5em] hover:text-white transition`} onClick={onClick}>
            {children}
        </button>
    )

}