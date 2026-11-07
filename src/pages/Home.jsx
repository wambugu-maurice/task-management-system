import SearchUsers from "../components/SearchUsers"
import useUser from "../hooks/useUser"

function Home() {
  const{loggedInUser}=useUser()
  return (
    <div>
      <SearchUsers />
    </div>
  )
}

export default Home