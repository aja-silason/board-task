import { Container } from "../components/layout/conatiner"
import { Text } from "../components/text/text";
import { removeNameIntoEmail } from "../utils/removeNameIntoTheEmail";

export function Home(){

    const storageUserData = localStorage?.getItem("userData");
    const parsedUserData = storageUserData && JSON.parse(storageUserData);

    const userData = parsedUserData?.providerData[0];

    const name = removeNameIntoEmail(userData?.email);

    //console.log("User Data Index Page", parsedUserData?.providerData[0]);

    return (
        <Container>

            <div className="flex flex-col gap-[1em] w-full px-[4em]">
                <Text text={`Saudações, ${name}`} style={{fontSize: "18pt"}} />

                <div className="">
                    <Text text="Suas tarefas"/>
                    <p>Home Screen {name}</p>
                </div>

            </div>


        </Container>
    )

}