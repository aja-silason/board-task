import { Info } from "@phosphor-icons/react"
import { Text } from "../text/text"

type props = {
    text: string
}

export const NoData = ({text}: props) => {
    return (
        <span className="flex flex-col gap-[.5em] justify-center w-full items-center">
            <Info size={30}/>
            <Text text={text}/>
        </span>
    )
}