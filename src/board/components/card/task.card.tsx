import { taskProps } from "../../page";
import { shortText } from "../../utils/shortText";
import { Text } from "../text/text"

type props = {
    data: taskProps,
    onClick?: VoidFunction,
    hoverMessage: string
}

export const TaskCard = ({data, hoverMessage, onClick}: props) => {

    const centerLetter = data?.title?.split('')[0];

    const title = shortText(data?.title, 15);
    const description = shortText(data?.description, 15);

    return (
        <button title={hoverMessage} type="button" className={`flex items-center justify-center border border-[#eee] p-[.4em] gap-[1em] md:h-[10em] md:w-[10em] w-[10em] h-[12em] rounded-[.5em] hover:shadow-lg transition`} onClick={onClick}>

            <div className="w-full h-full flex flex-col gap-[.5em]">
                <div className="bg-[#eee] border rounded-[.5em] h-full w-full flex items-center justify-center">
                    <h3 className="text-black border px-[.5em] rounded-[.2em] bg-white font-[800]">{centerLetter}</h3>
                </div>

                <div className="flex flex-col text-center items-start">
                    <Text text={title}/>
                    <Text text={description} style={{fontSize: "11pt"}} color="gray"/>
                </div>
            </div>

        </button>
    )

}