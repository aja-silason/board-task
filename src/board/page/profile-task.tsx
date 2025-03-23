import { TaskList } from "../components/card/task-list.card";
import { TaskCard } from "../components/card/task.card";
import { Container } from "../components/layout/container"
import { Text } from "../components/text/text";
import { tasklist } from "../utils/mock/mock";
import { removeNameIntoEmail } from "../utils/removeNameIntoTheEmail";

export type taskProps = {
    id: number,
    user_name: string,
    task_title: string,
    description: string,
    status: string
}

export function ProfileTask(){

    const storageUserData = localStorage?.getItem("userData");
    const parsedUserData = storageUserData && JSON.parse(storageUserData);

    const userData = parsedUserData?.providerData[0];

    const name = removeNameIntoEmail(userData?.email);

    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full px-[4em]">
                <Text text={`Saudações, ${name}`} style={{fontSize: "18pt", fontWeight: 600}} />

                <div className="flex flex-col gap-[1em]">
                    
                    <Text text="Suas tarefas" style={{fontWeight: 600}}/>

                    <div className=" flex gap-[1.5em] w-full flex-wrap h-[30em] overflow-auto">

                        {
                            tasklist?.slice(0,5)?.map((task) => {
                                return (
                                    <TaskCard key={task?.id} hoverMessage={task?.task_title} onClick={() => alert(`Abriu Tarefa ${task?.id}`)} data={task}/>
                                )
                            })
                        }


                    </div>


                    <Text text="Tarefas que foste adicionado recentemente" style={{fontWeight: 600}}/>

                    <div className="flex justify-between w-full px-[1em]">
                        <Text text="Tarefa" color="gray"/>
                        <Text text="Usuários associados" color="gray" style={{width: "20%", textAlign: "center"}}/>
                        <Text text="Criador" color="gray"/>
                    </div>

                    <div className=" flex gap-[.2em] w-full flex-wrap h-[10em] overflow-auto">


                    {
                            tasklist?.slice(0,2)?.map((task) => {
                                return (
                                    <TaskList key={task?.id} hoverMessage={task?.task_title} onClick={() => alert(`Abriu Tarefa ${task?.id}`)} data={task}/>
                                )
                            })
                        }
                    </div>

                </div>

            </div>


        </Container>
    )

}