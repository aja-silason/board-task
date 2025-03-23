import { taskProps } from "../../page";
import { shortText } from "../../utils/shortText";
import { Text } from "../text/text"

type props = {
    data: taskProps,
    onClick?: VoidFunction,
    hoverMessage: string
}

export const TaskList = ({data, hoverMessage, onClick}: props) => {

    const centerLetter = data?.task_title?.split('')[0];

    const title = shortText(data?.task_title, 40);

    const description = shortText(data?.description, 50);

    return (
        <button title={hoverMessage} type="button" className={`flex items-center justify-center border border-[#eee] p-[.4em] gap-[1em] h-[4em] w-full rounded-[.5em] hover:shadow-lg transition`} onClick={onClick}>

            <div className="w-full h-full justify-between flex gap-[.5em]">
                
                <div className="flex gap-[.5em] items-center w-[50%]">
                    <div className="bg-[#eee] border rounded-[.5em] h-full w-[3em] flex items-center justify-center">
                        <h3 className="text-black border px-[.5em] rounded-[.3em] bg-white font-[800]">{centerLetter}</h3>
                    </div>

                    <div className="flex flex-col items-start">
                        <Text text={title}/>
                        <Text text={description} style={{fontSize: "11pt"}} color="gray"/>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-[50%]">
                    <Text text={5} style={{fontSize: "11pt"}} color="gray"/>
                </div>
                
                <div className="flex flex-col items-end justify-center w-[50%]">
                    <Text text={data?.user_name} style={{fontSize: "11pt"}} color="gray"/>
                </div>

            </div>

        </button>
    )

}