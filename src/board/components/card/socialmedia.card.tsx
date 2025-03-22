import { ReactNode } from "react"

type props = {
    social_midia_logo: ReactNode,
    text: string
}

export const SocialMidiaCard = ({social_midia_logo, text}: props) => {

    return (
        <div className="flex items-center justify-center border py-[.6em] gap-[1em] rounded-[.5em]">
            {social_midia_logo}
            <p className="font-[600]">{text}</p>
        </div>
    )

}