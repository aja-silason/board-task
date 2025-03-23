import { CircularProgress } from "@mui/material"

type props = {
    onClick?: VoidFunction,
    text: string,
    type?: "button" | "submit" | "reset" | undefined,
    style?: object,
    isLoading?: boolean
}

export const Button = ({text, type, style, isLoading, onClick}: props) => {

    return (
        <button type={type ?? "button"} onClick={onClick} className={`border p-[.8em] flex items-center justify-center rounded-[.5em] bg-black  text-[#fff]`} style={style}>

            {
                isLoading ? (
                    <CircularProgress size={20} color="inherit" className="px-[.1em]"/>
                ) : text
            }
        </button>

    )
}