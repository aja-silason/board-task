import { Text } from "../text/text"

type comments = {
    data: any
}

export const CommentCard = ({data}: comments) => {
    return (
        <div className='border-b rounded-[7px] px-[1em] py-[.5em] w-full my-[.5em]' key={1}>
            <span className='flex gap-[.2em]'>
            <Text text="Participante:" style={{fontSize: "10pt"}}/>
            <Text text="Jair Bolsonaro" style={{fontWeight: 700, fontSize: "10pt"}}/>
            </span>
            <span className='flex gap-[.2em]'>
            <Text text="Comentário: " style={{fontWeight: 700, fontSize: "10pt"}}/>
            <Text text={data?.comment} style={{fontSize: "10pt"}}/>
            </span>
        </div>
    )
}