import logo from "../../../../assets/logo-board.svg"
import { Notification } from "@phosphor-icons/react";
import { useAuth } from "../../../context/auth.context";
import { IconNotification } from "../../card/action-notification.card";
import { ProfileCard } from "../../card/profile.card";
import ProfileModal from "../../modal/popover-profile";
import NotificationModal from "../../modal/popover-notification";
import { useEffect, useState } from "react";

type props = {
    style: any
}
export const NavBarMobile = ({style}: props) => {

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
        <div className={`w-full border flex justify-between py-[.5em] px-[.5em] items-center bg-white ${style}`}>
            
            <div className="w-[100%]">
                <img src={logo} alt="" className="w-[8em]"/>
            </div>
            
            <div className="w-[100%] flex justify-end gap-[1em] items-center">

                <NotificationModal>
                    <IconNotification onClick={() => {}} icon={<Notification size={20} />} hoverMessage="Notificação"/>
                </NotificationModal>

                <ProfileModal data={user}>
                    <ProfileCard onClick={() => {}} hoverMessage="Perfil">
                        {
                            imageProfile ? (
                                <img src={"profilePicture"} alt="" className="rounded-[5em]"/> 
                            ) : <p className="p-[.3em] font-[800]">{firstName?.toUpperCase()}</p>
                        }
                    </ProfileCard>
                </ProfileModal>

            </div>

        </div>
    )
}