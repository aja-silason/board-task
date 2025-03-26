import { useParams } from "react-router-dom";
import { Container } from "../components/layout/container"
import { InnerTaskContainer } from "../components/layout/inner-task-container";
import { useCommom } from "../context/common.context";
import { useGetData } from "../hook/get/useGetData";
import { Button } from "../components/button/button";
import CreateTaskModal from "../components/modal/modal-create-task";
import BoardTasks from "../components/drag-and-drp/board";
import { useScreen } from "../context/screen.context";
import { Text } from "../components/text/text";
import AddParticipantsModal from "../components/modal/modal-add-particioants";

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

    const {isfirst, isSecond} = useCommom();

    const {data} = useGetData("boards");

    const filterTask: any = data?.filter((task) => task?.id?.includes(id));

    const {isLargeScreen, isVisible} = useScreen();

    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full px-[1em]">

                <InnerTaskContainer name_task={filterTask[0]?.title}>
                    {
                        isfirst ? (

                            <div className="flex flex-col gap-[1em]">
                                <div className="flex justify-end">
                                    <CreateTaskModal children={<Button text="Adicionar Tarefa" style={{height: "40px"}}/>}/>
                                </div>
                                <h3>Tarefas do Board</h3>
                                <div className={`flex flex-col overflow-auto h-[40em] w-full ${!isLargeScreen && isVisible ? '' : 'md:w-full w-full '}`}>
                                    <BoardTasks datas={filterTask}/>
                                </div>
                            </div>

                        ): isSecond && (
                            <div className="flex md:w-full flex-col gap-[1em] border-red-900 h-full">
                                <div className="flex justify-end">
                                    <AddParticipantsModal data={filterTask[0]} children={<Button text="Adicionar Participante" style={{height: "40px"}}/>}/>
                                </div>
                                <Text text="Participantes"/>
                                

                            </div>
                        )
                    }
                </InnerTaskContainer>

            </div>

        </Container>
    )

}
