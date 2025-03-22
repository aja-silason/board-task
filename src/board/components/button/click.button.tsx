import { useTheme } from "../../context/themeContext"

type props = {
    onClick: VoidFunction,
    text: string
}

export const ClickButton = ({text, onClick}: props) => {

    const {theme} = useTheme();

    return (
        <button type="button" onClick={onClick} className={`border p-[.8em] rounded-[.5em]
            ${theme == "dark" ? 'bg-white' : 'bg-black  text-[#fff]'}
        `}>{text}</button>
    )
}