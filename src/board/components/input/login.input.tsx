//|
type loginProps = {
    placeholder?: string,
    type?: string,
    required?: boolean,
    value?: string | number,
    onChange?: (e: any) => void,
    name?: string,
}

export const LoginInput = ({placeholder, value, name, onChange, required, type}: loginProps) => {
    return (
        <div className="border w-full rounded-[5px]">
            <input type={type ?? "text"} placeholder={placeholder ?? "Digite valor aqui"} className="w-full p-[.5em] py-[1em] font-[500] rounded-[5px]" required={required} value={value} name={name} onChange={onChange}/>
        </div>
    )
}