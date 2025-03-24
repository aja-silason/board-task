import { TabButton } from "../components/button/tab.button";
import { TaskList } from "../components/card/task-list.card";
import { TaskCard } from "../components/card/task.card";
import { Container } from "../components/layout/container"
import { Text } from "../components/text/text";
import { useToogle } from "../hook/behavior/useToogle";
import { useInternNavigation } from "../hook/behavior/useNavigation";
import { useGetData } from "../hook/get/useGetData";
import { NoData } from "../components/behavior/nodata";

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

    const {data} = useGetData("boards");


    const storageUserData = localStorage?.getItem("userData");
    const parsedUserData = storageUserData && JSON.parse(storageUserData);

    
    const myTasks = data?.filter((item) => item?.ownerId === parsedUserData?.uid);

    const tasksThatIMakePart = data?.filter((item) => item?.participants?.includes(parsedUserData?.uid));


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
                                        !myTasks || myTasks.length === 0 ? (
                                            <NoData text="Sem informação para mostrar no momento"/>
                                        ) :
                                        myTasks?.map((task: any, index: number) => {
                                                return (
                                                    <TaskCard key={index} hoverMessage={task?.title} onClick={() => handleNavigateToProfileTask(task?.id) } data={task}/>
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

                                <div className=" flex gap-[.2em] w-full flex-col md:h-[40em] overflow-auto">
                                
                                {tasksThatIMakePart && tasksThatIMakePart.length > 0 ? (
                                        tasksThatIMakePart.map((task) => (
                                            <TaskList key={task?.id} hoverMessage={task?.title} onClick={() => handleNavigateToProfileTask(task?.id)} data={task}/>
                                        ))
                                    ) : (
                                        <NoData text="Não pertence a outras tarefas no momento" />
                                    )}
                                    
                                </div>
                            </>
                        )
                    }
                    

                </div>

            </div>


        </Container>
    )

}