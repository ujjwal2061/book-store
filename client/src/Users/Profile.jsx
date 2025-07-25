import { useContext } from "react"
import { Usercontext } from "./context/userContext"
import User_Profile_view from "../UI_view/User_Profile_view";

export const Profile=()=>{
    const {user}=useContext(Usercontext);
    const details=user.data;
    if(!user)return <p>Loading...</p>
    return <User_Profile_view firstname={details.firstname}
    lastname={details.lastname} email={details.email}
    />
}