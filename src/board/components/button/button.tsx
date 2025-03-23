import { CircularProgress } from "@mui/material"

type props = {
    onClick?: VoidFunction,
    text: string,
    type?: "button" | "submit" | "reset" | undefined,
    style?: object
}

export const Button = ({text, type, style, onClick}: props) => {

    return (
        <button type={type ?? "button"} onClick={onClick} className={`border p-[.8em] rounded-[.5em] bg-black  text-[#fff]`} style={style}>
            <CircularProgress />
            {text}
        </button>

    )
}