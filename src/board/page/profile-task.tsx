import { Container } from "../components/layout/container"
import { InnerTaskContainer } from "../components/layout/inner-task-container";
import { useCommom } from "../context/common.context";

export type taskProps = {
    id: number,
    user_name: string,
    task_title: string,
    description: string,
    status: string
}

export function ProfileTask(){

    {/*
    const storageUserData = localStorage?.getItem("userData");
    const parsedUserData = storageUserData && JSON.parse(storageUserData);

    const userData = parsedUserData?.providerData[0];*/}

    const {isfirst, isSecond, isThird} = useCommom();

    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full px-[4em]">

                <InnerTaskContainer>
                    {
                        isfirst ? (<p>Task</p> ): isSecond ? <p>Board</p> : isThird && <p>Participants</p> 
                    }
                </InnerTaskContainer>

            </div>

        </Container>
    )

}
