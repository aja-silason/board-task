type props = {
    text: string
    color?: string,
    center?: boolean,
    end?: boolean
}

export const ThinText = ({text, color, center, end}: props) => {
    
    return (
        <p className={`text-[12pt] 15pt font-[500] ${center ? 'text-center' : end ? 'text-end' : null}  ${color == "gray" ? 'text-[gray]' : null} `}>{text}</p>
    )

}
