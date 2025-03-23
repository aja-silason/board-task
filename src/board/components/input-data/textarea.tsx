//|
type loginProps = {
    placeholder?: string,
    required?: boolean,
    value?: string | number,
    onChange?: (e: any) => void,
    name?: string,
    style?: object
}

export const TextArea = ({placeholder, value, name, onChange, required, style}: loginProps) => {
    return (
        <div className="border w-full rounded-[5px] h-[15em]">
            <textarea placeholder={placeholder ?? "Digite valor aqui"} className="w-full p-[.5em] py-[1em] h-[15em] outline-none font-[500] rounded-[5px]" required={required} value={value} name={name} onChange={onChange} style={style}></textarea>
        </div>
    )
}