import { shortText } from "../../utils/shortText";
import { Text } from "../text/text"

type props = {
    data: any,
    onClick?: VoidFunction,
    hoverMessage: string
}

export const TaskList = ({data, hoverMessage, onClick}: props) => {

    //const {isLargeScreen, isVisible} = useScreen();

    const centerLetter = data?.title?.split('')[0];

    const title = shortText(data?.title, 30);

    const description = shortText(data?.description, 40);
    
    const totalUser = data?.participants?.length;

    return (
        <button title={hoverMessage} type="button" className={`flex items-center justify-center border border-[#eee] p-[.4em] gap-[1em] h-[4em] w-full rounded-[.5em] hover:shadow-lg transition`} onClick={onClick}>

            <div className="w-full h-full justify-between flex gap-[.5em]">
                
                <div className="flex gap-[.5em] items-center w-[50%]">
                    <div className="bg-[#eee] border rounded-[.5em] h-full w-[3em] flex items-center justify-center">
                        <h3 className="text-black border px-[.5em] rounded-[.3em] bg-white font-[800]">{centerLetter}</h3>
                    </div>

                    <div className="flex flex-col items-start">
                        <Text text={title ?? ""}/>
                        <Text text={description} style={{fontSize: "11pt"}} color="gray"/>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-[50%]">
                    <Text text={totalUser} style={{fontSize: "11pt"}} color="gray"/>
                </div>
                
                <div className="flex flex-col items-end justify-center w-[50%]">
                    <Text text={"Sem informação"} style={{fontSize: "11pt"}} color="gray"/>
                </div>

            </div>

        </button>
    )

}

export const TaskListMobile = ({data, hoverMessage, onClick}: props) => {

    const centerLetter = data?.title?.split('')[0];

    const title = shortText(data?.title, 30);

    const description = shortText(data?.description, 40);
    

    return (
        <button title={hoverMessage} type="button" className={`flex items-center justify-center border border-[#eee] p-[.4em] gap-[1em] h-[4em] w-full rounded-[.5em] hover:shadow-lg transition`} onClick={onClick}>

            <div className="w-full h-full justify-between flex gap-[.5em]">
                
                <div className="flex gap-[.5em] items-center w-[100%]">
                    <div className="bg-[#eee] border rounded-[.5em] h-full w-[3em] flex items-center justify-center">
                        <h3 className="text-black border px-[.5em] rounded-[.3em] bg-white font-[800]">{centerLetter}</h3>
                    </div>

                    <div className="flex flex-col items-start">
                        <Text text={title ?? ""}/>
                        <Text text={description} style={{fontSize: "11pt"}} color="gray"/>
                    </div>
                </div>

            </div>

        </button>
    )

}