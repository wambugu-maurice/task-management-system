import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import UsersDisplay from "./UsersDisplay";
import toast from "react-hot-toast";

function SearchUsers({ teamMember, setTeamMember ,added,setAdded}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchedUser([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const q = query(
          collection(db, "users"),
          where("name", ">=", searchQuery),
          where("name", "<=", searchQuery + "\uf8ff"),
        );
        const snapshot = await getDocs(q);
        setSearchedUser(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  function handleAddTeamber(member){
    const alreadySelected = teamMember.some((user)=> user.id === member.id)
    if(alreadySelected){
      toast.error("Member already added")
      return
    }
    setTeamMember((prev)=>[...prev,{id: member.id,name: member.name,email: member.email}])
    setAdded((prev)=>[...prev,member])
    setSearchQuery("")
    setSearchedUser([])
  }

  return (
    <div>
      <UsersDisplay
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        searchedUser={searchedUser}
        setSearchQuery={setSearchQuery}
        handleAddTeamber={handleAddTeamber}
        added={added}
      />
    </div>
  );
}

export default SearchUsers