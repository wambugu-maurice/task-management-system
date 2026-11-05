import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function Layout() {
  return (
    <div>
        <Sidebar />
        <div className="main">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout