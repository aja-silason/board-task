type loginProps = {
    placeholder?: string,
    type?: string,
    required?: boolean
}

export const LoginInput = ({placeholder, required, type}: loginProps) => {
    return (
        <div className="border w-full rounded-[5px]">
            <input type={type ?? "text"} placeholder={placeholder ?? "Digite valor aqui"} className="w-full p-[.5em] py-[1em] font-[500] rounded-[5px]" required={required}/>
        </div>
    )
}