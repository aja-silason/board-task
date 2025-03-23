type props = {
    text: string
    color?: string,
    center?: boolean,
    end?: boolean,
    style?: object
}

export const Text = ({text, color, center, end, style}: props) => {
    
    return (
        <p className={`text-[12pt] 15pt font-[500] ${center ? 'text-center' : end ? 'text-end' : null}  ${color == "gray" ? 'text-[gray]' : null}`} style={style}>{text}</p>
    )

}
