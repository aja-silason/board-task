import { ReactNode } from "react"

type props = {
    social_midia_logo: ReactNode,
    text: string,
    onClick?: VoidFunction
}

export const SocialMidiaCard = ({social_midia_logo, text, onClick}: props) => {

    return (
        <button type="button" className={`flex items-center justify-center border py-[.6em] gap-[1em] rounded-[.5em] hover:bg-black hover:text-white transition `} onClick={onClick}>
            {social_midia_logo}
            <p className="font-[600]">{text}</p>
        </button>
    )

}