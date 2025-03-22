import { useTheme } from "../../context/themeContext"

type props = {
    text: string
}

export const ThinText = ({text}: props) => {
    
    const {theme} = useTheme()

    return (
        //<p className={`text-[12pt] 15pt font-[500] ${theme == "dark" && 'text-[#fff]'}`}>{text}</p>

        <p className={`text-[12pt] 15pt font-[500]`}>{text}</p>
    )

}
