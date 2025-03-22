import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "../../context/themeContext"

export const ButtonTheme = () => {

    const {theme, setTheme} = useTheme()

    const handleTheme = (value: string) => {
        setTheme(value);
        localStorage.setItem("theme", JSON.stringify(value));
    }

    return (
        <div className="flex gap-[1em]">
        
            <button type="button" onClick={() => handleTheme("light")} className={`${theme == "light" && 'bg-black p-[.5em]'}  rounded-[.5em]`} disabled={theme == "light" && true}>
                <Sun color={ theme == "light" ? "white" : "black" }/>
            </button>

            <button type="button" onClick={() => handleTheme("dark")} className={`${theme == "dark" && 'bg-black p-[.5em]'} p-[.5em] rounded-[.5em]`} disabled={theme == "dark" && true}>
                <Moon color={ theme == "dark" ? "white" : "black" }/>
            </button>

        </div>
    )

}