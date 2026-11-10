import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export function useProjects(){
    const[projects,setProjects]=useState([])
    const[error,setError]=useState("")
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        setError("")
        const projectQuery = query(collection(db,"projects"),orderBy("addedOn","desc"));
        const unsubscribe = onSnapshot(projectQuery,(snapshot)=>{
            setProjects(snapshot.docs.map((doc)=>({id: doc.id,...doc.data()})))
            setLoading(false)
        },(err)=>{
            setError(err.message)
        })
        return ()=> unsubscribe()
    },[])

    return{projects,error,loading}
}