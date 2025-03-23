import { ChangeEvent } from "react";
import logo from "../../../../assets/logo-board.svg"
import { useCommom } from "../../../context/common.context"
import { Input } from "../../input/input"
import { Notification } from "@phosphor-icons/react";
import { useAuth } from "../../../context/auth.context";
import { IconNotification } from "../../card/action-notification.card";
import { ProfileCard } from "../../card/profile.card";

export const NavBar = () => {

    const {filter, setFilter} = useCommom();
    const {user} = useAuth();

    console.log("User ===", user?.accessToken, user, user);

    const username = user?.displayName ?? user?.email;

    const profilePicture = user?.photoURL;
    const oneLetter = user?.email?.split('')[0];

    console.log("Username", username, username, oneLetter);

    return (
        <div className="w-full border flex justify-between py-[.5em] px-[.5em] items-center">
            
            <div className="w-[100%]">
                <img src={logo} alt="" className="w-[8em]"/>
            </div>
            
            <div className="w-[100%]">
                <Input name="filter" onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e?.target?.value)} placeholder="Pesquisar tarefas" value={filter} type="text" style={{height: "40px"}}/>

            </div>
            
            <div className="w-[100%] flex justify-end gap-[1em] items-center">

                <IconNotification onClick={() => {}} icon={<Notification size={20} />} hoverMessage="Notificação"/>

                <ProfileCard onClick={() => {}} hoverMessage="Perfil">
                    {
                        profilePicture ? (
                            <img src={profilePicture} alt="" className="rounded-[5em]"/> 
                        ) : <p className="p-[.3em]">{oneLetter?.toUpperCase()}</p>
                    }

                </ProfileCard>
            </div>

        </div>
    )
}