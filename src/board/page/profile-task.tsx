import { useParams } from "react-router-dom";
import { Container } from "../components/layout/container"
import { InnerTaskContainer } from "../components/layout/inner-task-container";
import { useCommom } from "../context/common.context";
import { useGetData } from "../hook/get/useGetData";

export type taskProps = {
    id: number,
    user_name: string,
    task_title: string,
    description: string,
    status: string
}

export function ProfileTask(){

    const {id} = useParams();

    {/*
    const storageUserData = localStorage?.getItem("userData");
    const parsedUserData = storageUserData && JSON.parse(storageUserData);

    const userData = parsedUserData?.providerData[0];*/}

    const {isfirst, isSecond, isThird} = useCommom();

    const {data} = useGetData("boards");

    const filterTask: any = data?.filter((task) => task?.id?.includes(id))[0]

    console.log("Task", filterTask, data, id)

    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full px-[4em]">

                <InnerTaskContainer name_task={filterTask?.title}>
                    {
                        isfirst ? (
                        
                            <p>Task</p> 

                        ): isSecond ? <p>Board</p> : isThird && <p>Participants</p> 
                    }
                </InnerTaskContainer>

            </div>

        </Container>
    )

}
