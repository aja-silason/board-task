import logo from "../../../../assets/logo-board.svg"
import { Notification } from "@phosphor-icons/react";
import { useAuth } from "../../../context/auth.context";
import { IconNotification } from "../../card/action-notification.card";
import { ProfileCard } from "../../card/profile.card";
import ProfileModal from "../../modal/popover-profile";
import NotificationModal from "../../modal/popover-notification";
import SearchModal from "../../modal/modal-search";
import { useEffect, useState } from "react";

export const NavBar = () => {

    const [imageProfile, setImageProfile] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    
    const {user} = useAuth();
    
    console.log("USER DATA", user?.photoURL)

    useEffect(() => {
        const profilePicture = user?.photoURL;
        const oneLetter = user?.email?.split('')[0];

        setImageProfile(profilePicture);
        setFirstName(oneLetter);

    }, [])


    return (
        <div className="w-full border flex justify-between py-[.5em] px-[.5em] items-center bg-white">
            
            <div className="w-[100%]">
                <img src={logo} alt="" className="w-[8em]"/>
            </div>
            
            <div className="w-[100%]">

                <SearchModal>
                    <button type="button" className="border border-1 w-full rounded-[5px] p-[.5em] text-start py-[.5em] font-[500]">Pesquisar tarefas</button>
                </SearchModal>

            </div>
            
            <div className="w-[100%] flex justify-end gap-[1em] items-center">

                <NotificationModal>
                    <IconNotification onClick={() => {}} icon={<Notification size={20} />} hoverMessage="Notificação"/>
                </NotificationModal>

                <ProfileModal data={user}>
                    <ProfileCard onClick={() => {}} hoverMessage="Perfil">
                        {
                            !imageProfile ? (
                                <img src={"profilePicture"} alt="" className="rounded-[5em]"/> 
                            ) : <p className="p-[.3em] font-[800]">{firstName?.toUpperCase()}</p>
                        }
                    </ProfileCard>
                </ProfileModal>

            </div>

        </div>
    )
}