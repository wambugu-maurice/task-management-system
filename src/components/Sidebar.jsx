import { RxDashboard  } from "react-icons/rx";
import { FaRegFolderOpen } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { VscTasklist } from "react-icons/vsc";
import { Link } from "react-router-dom";


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
      icon: AiOutlineMessage
    },{
      title: "Users",
      path: "users",
      icon: LiaUserFriendsSolid 
    },{
      title: "Tasks",
      path: "tasks",
      icon: VscTasklist 
    }
  ]
  return (
    <div className="sideBar">
      <div className="logo">
        <h2>Dev Taskers</h2>
      </div>
      <div className="linksDiv">
        <ul>
          {
            links.map((link)=>(
              <div className="links" key={link.path}>
                <div className="icons"><link.icon /></div>
                <div><li><Link to={link.path}>{link.title}</Link></li></div>
              </div>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Sidebar