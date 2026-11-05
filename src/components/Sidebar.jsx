import { RxDashboard  } from "react-icons/rx";
import { FaRegFolderOpen } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";




function Sidebar() {
  const links = [
    {
      path: "home",
      title: "Dashboard",
      icon: RxDashboard 
    },{
      title: "Projects",
      path: "projects",
      icon: FaRegFolderOpen
    },{
      title: "Messages",
      path: "messages",
      icons: AiOutlineMessage 
    },{
      title: "Users",
      path: "users",
      icon: LiaUserFriendsSolid 
    }
  ]
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar