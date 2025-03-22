import { ReactNode } from "react"
import { useTheme } from "../../context/theme.context"

type props = {
    social_midia_logo: ReactNode,
    text: string
}

export const SocialMidiaCard = ({social_midia_logo, text}: props) => {

    const {theme} = useTheme();

    return (
        <div className={`flex items-center justify-center border py-[.6em] gap-[1em] rounded-[.5em] ${theme == "dark" && 'bg-white'}`}>
            {social_midia_logo}
            <p className="font-[600]">{text}</p>
        </div>
    )

}