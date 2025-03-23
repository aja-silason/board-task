import { TabButton } from "../components/button/tab.button";
import { TaskList } from "../components/card/task-list.card";
import { TaskCard } from "../components/card/task.card";
import { Container } from "../components/layout/container"
import { Text } from "../components/text/text";
import { useToogle } from "../hook/behavior/useToogle";
import { tasklist } from "../utils/mock/mock";
import { useInternNavigation } from "../hook/behavior/useNavigation";

export type taskProps = {
    id: number,
    user_name: string,
    task_title: string,
    description: string,
    status: string
}



export function Task(){

    const {isfirst, isSecond, handleIsFirst, handleIsSecond} = useToogle();

    const {handleNavigateToProfileTask} = useInternNavigation();


    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full px-[4em]">
                <Text text={`Tarefas em Grupo`} style={{fontSize: "18pt", fontWeight: 600}} />

                <span className="flex gap-[1em]">
                    <TabButton onClick={handleIsFirst} title="Minhas Tarefas" isActive={isfirst}/>
                
                    <TabButton onClick={handleIsSecond} title="Tarefas Associadas" isActive={isSecond}/>
                
                </span>

                <div className="flex flex-col gap-[1em]">


                    {
                        isfirst && (
                            <>
                                <Text text="Suas tarefas" style={{fontWeight: 600}}/>
                                <div className=" flex gap-[1.5em] w-full flex-wrap h-[40em] overflow-auto">
            
                                    {
                                        tasklist?.map((task) => {
                                            return (
                                                <TaskCard key={task?.id} hoverMessage={task?.task_title} onClick={() => handleNavigateToProfileTask(task?.id)} data={task}/>
                                            )
                                        })
                                    }
            
                                </div>
                            </>
                        )
                    }

                    
                    {
                        isSecond && (
                            <>
                                <Text text="Tarefas que fazes parte" style={{fontWeight: 600}}/>

                                <div className="flex justify-between w-full px-[1em]">
                                    <Text text="Tarefa" color="gray"/>
                                    <Text text="Usuários associados" color="gray" style={{width: "20%", textAlign: "center"}}/>
                                    <Text text="Criador" color="gray"/>
                                </div>

                                <div className=" flex gap-[.2em] w-full flex-wrap md:h-[40em] overflow-auto">


                                {
                                        tasklist?.map((task) => {
                                            return (
                                                <TaskList key={task?.id} hoverMessage={task?.task_title} onClick={() => alert(`Abriu Tarefa ${task?.id}`)} data={task}/>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    }
                    

                </div>

            </div>


        </Container>
    )

}