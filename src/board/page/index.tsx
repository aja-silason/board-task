import { Button } from "../components/button/button";
import { TaskList } from "../components/card/task-list.card";
import { TaskCard } from "../components/card/task.card";
import { Container } from "../components/layout/container"
import { Text } from "../components/text/text";
import { useInternNavigation } from "../hook/behavior/useNavigation";
import { useGetData } from "../hook/get/useGetData";
import { removeNameIntoEmail } from "../utils/removeNameIntoTheEmail";
import { NoData } from "../components/behavior/nodata";
import CreateBoardModal from "../components/modal/modal-create-board";
import SearchModal from "../components/modal/modal-search";
import { useScreen } from "../context/screen.context";

export type taskProps = {
    id: number,
    user_name: string,
    title: string,
    description: string,
    status: string
}

export function Home(){

    const storageUserData = localStorage?.getItem("userData");
    const parsedUserData = storageUserData && JSON.parse(storageUserData);

    const userData = parsedUserData?.providerData[0];

    const name = removeNameIntoEmail(userData?.email);

    const {handleNavigateToProfileTask} = useInternNavigation();

    const {data} = useGetData("boards");

    const myTasks = data?.filter((item) => item?.ownerId === parsedUserData?.uid);

    const tasksThatIMakePart = data?.filter((item) => item?.participants?.includes
    (parsedUserData?.uid));

    //const tasksThatIMakePart2 = data?.filter((item) => item?.participants?.id == "AJrBcqkzxzXR5iwx2aPAaGSUPBx2");
    
    const tasksThatIMakePart2 = data?.map((item) => item?.participants)?.flat()?.filter((item) => item?.id == parsedUserData?.uid);

    console.log("ertyu", myTasks);

    const {isLargeScreen, isVisible} = useScreen();

    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full md:px-[4em]">
                
                <div className="md:hidden w-[100%]">
                    <SearchModal>
                        <button type="button" className="border border-1 w-full outline-none rounded-[5px] p-[.5em] text-start py-[.5em] font-[500]">Pesquisar tarefas</button>
                    </SearchModal>
                </div>

                <Text text={`Saudações, ${name}`} style={{fontSize: "18pt", fontWeight: 600}} />

                <div className="flex flex-col gap-[1em]">
                    
                    <div className="flex justify-between">
                        <Text text="Suas tarefas" style={{fontWeight: 600}}/>
                        <CreateBoardModal children={<Button text="Novo Quadro"/>}/>
                    </div>

                    <div className=" flex gap-[1.5em] w-full flex-wrap md:h-[16em] overflow-auto">
                        {
                            !myTasks || myTasks.length === 0 ? (
                                <NoData text="Sem informação para mostrar no momento"/>
                            ) :
                            myTasks?.map((task: any, index: number) => {
                                return (
                                    <>
                                    <TaskCard key={index} hoverMessage={task?.title} onClick={() => handleNavigateToProfileTask(task?.id) } data={task}/>
                                    </>
                                )
                            })
                        }
                    </div>


                    <span className={`${!isLargeScreen && isVisible ? 'hidden' : 'md:block hidden'}`}>
                        <Text text="Tarefas que foste adicionado recentemente" style={{fontWeight: 600}}/>
                    </span>

                    <div className={`${!isLargeScreen && isVisible ? 'flex' : 'hidden'} md:flex justify-between w-full px-[1em]`}>
                        <Text text="Tarefa" color="gray"/>
                        <Text text="Usuários" color="gray" style={{width: "20%", textAlign: "center"}}/>
                        <Text text="Criador" color="gray"/>
                    </div>

                    <div className={` ${!isLargeScreen && isVisible ? 'flex' : 'hidden'} md:flex gap-[.2em] w-full flex-wrap h-[10em] overflow-auto`}>
                    
                    { 
                        tasksThatIMakePart2 && tasksThatIMakePart2.length > 0 ? (
                            tasksThatIMakePart.map((task) => (
                                <TaskList key={task?.id} hoverMessage={task?.title} onClick={() => handleNavigateToProfileTask(task?.id)} data={task}/>
                            ))
                        ) : (
                            <NoData text="Não pertence a outras tarefas no momento" />
                        ) 
                    }
                    </div>

                </div>

            </div>


        </Container>
    )

}