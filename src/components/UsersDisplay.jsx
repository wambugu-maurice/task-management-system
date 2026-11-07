
import ErrorMessage from "./ErrorMessage"

function UsersDisplay({error,searchQuery,setSearchQuery,loading,searchedUser,handleAddTeamber}) {

  return (
    <div >
      {error && <ErrorMessage error={error}/>}
      <input className="searchInput" placeholder="search" type="search"  value={searchQuery} 
      onChange={(e)=>setSearchQuery(e.target.value)} />
      <ul>
        {
          loading ? <p>Searching...</p> 
          : 
          searchedUser?.map((user)=>(
            <li key={user.id} onClick={()=>handleAddTeamber(user)}>{user.name}</li>
          ))
        }
        
      </ul>
    </div>
  )
}

export default UsersDisplay