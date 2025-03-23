import { TaskList } from "../components/card/task-list.card";
import { Container } from "../components/layout/container"
import { Text } from "../components/text/text";
import { tasklist } from "../utils/mock/mock";

export type taskProps = {
    id: number,
    user_name: string,
    task_title: string,
    description: string,
    status: string
}

export function Task(){


    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full px-[4em]">
                <Text text={`Tarefas em Grupo`} style={{fontSize: "18pt", fontWeight: 600}} />

                <div className="flex flex-col gap-[1em]">

                    <Text text="Tarefas que estás adicionado" style={{fontWeight: 600}}/>

                    <div className="flex justify-between w-full px-[1em]">
                        <Text text="Tarefa" color="gray"/>
                        <Text text="Usuários associados" color="gray" style={{width: "20%", textAlign: "center"}}/>
                        <Text text="Criador" color="gray"/>
                    </div>

                    <div className=" flex gap-[.2em] w-full flex-wrap md:h-[45em] overflow-auto">


                    {
                            tasklist?.map((task) => {
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