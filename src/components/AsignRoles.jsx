import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import toast from "react-hot-toast"

function AsignRoles({handleAssign,editMember}) {
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
    const[member,setMember]=useState("")
    const[selectedMember,setSelectedMember]=useState([])

    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(!member){
                setSelectedMember([])
                return
            }
            setError("")
            setLoading(true)
            try {
                const q = query(
                          collection(db, "users"),
                          where("name", ">=", member),
                          where("name", "<=", member + "\uf8ff"),
                        );
                        const snapshot = await getDocs(q);
                        setSelectedMember(
                          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
                        );
            } catch (err) {
                setError(err.message)
                toast.error(err.message)
                
            }finally{
                setLoading(false)
            }
            
        },400)
        return ()=> clearTimeout(timer)
    },[member])
  return (
    <div>
        <input type="search" value={member} onChange={(e)=>setMember(e.target.value)} className="editInput" placeholder="john doe"/>
        <div className="rolesMembers">
            {
                selectedMember?.map((selected)=>
                <li onClick={handleAssign ? () => handleAssign(selected) : undefined} key={selected.id}>{selected.name} | {selected.email}</li>)
            }
            <ul>
                {
                    editMember?.map((edit)=>
                    <li key={edit.id}>{edit.name}</li>)
                }
            </ul>
        </div>
    </div>
  )
}

export default AsignRoles