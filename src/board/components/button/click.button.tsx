type props = {
    onClick: VoidFunction,
    text: string
}

export const ClickButton = ({text, onClick}: props) => {
    return (
        <button type="button" onClick={onClick} className="border p-[.8em]">{text}</button>
    )
}