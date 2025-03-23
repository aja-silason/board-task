import { TaskCard } from "../components/card/task.card";
import { Container } from "../components/layout/conatiner"
import { Text } from "../components/text/text";
import { tasklist } from "../utils/mock/mock";
import { removeNameIntoEmail } from "../utils/removeNameIntoTheEmail";

export type taskProps = {
    id: number,
    user_name: string,
    task_title: string,
    status: string
}

export function Home(){

    const storageUserData = localStorage?.getItem("userData");
    const parsedUserData = storageUserData && JSON.parse(storageUserData);

    const userData = parsedUserData?.providerData[0];

    const name = removeNameIntoEmail(userData?.email);

    //console.log("User Data Index Page", parsedUserData?.providerData[0]);

    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full px-[4em]">
                <Text text={`Saudações, ${name}`} style={{fontSize: "18pt", fontWeight: 600}} />

                <div className="flex flex-col gap-[1em]">
                    
                    <Text text="Suas tarefas" style={{fontWeight: 600}}/>

                    <div className=" flex gap-[1.5em] w-full flex-wrap h-[30em] overflow-auto">

                        {
                            tasklist?.map((task) => {
                                return (
                                    <TaskCard key={task?.id} hoverMessage={task?.task_title} onClick={() => alert(`Abriu Tarefa ${task?.id}`)} data={task}/>
                                )
                            })
                        }


                    </div>


                    <p>Home Screen {name}</p>
                </div>

            </div>


        </Container>
    )

}