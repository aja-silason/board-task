type tabButtonProps = {
    title: string,
    onClick: VoidFunction,
    isActive: boolean
}
export const TabButton = ({title, isActive, onClick}: tabButtonProps) => {
    return (
        <button type="button" onClick={onClick} className={`${isActive ? "bg-black text-[#fff] font-semibold" : "bg-[#eee] text-[#000]"} text-[10pt] p-[.5em] rounded-[.5em]`}>{title}</button>
    )
}