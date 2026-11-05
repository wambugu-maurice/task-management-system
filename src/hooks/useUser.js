import { useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { onSnapshot } from "firebase/firestore"
import {  doc } from "firebase/firestore"
import { db } from "../firebase"

function useUser() {
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState("")
    const[loggedInUser,setLoggedInUser]=useState(null)

    const auth = getAuth()
    useState(()=>{
        let snapshot
        const unsubUser = onAuthStateChanged(auth,async(user)=>{
            setLoading(true)
            if(!user) return setLoggedInUser(null);
            const userRef = doc(db,"users",user.uid)
             snapshot = onSnapshot(userRef,(snap)=>{
                setLoggedInUser(snap.exists() ? {id: snap.id,...snap.data()}:null)
                setLoading(false)
            })
        },(err)=>{
            setError(err.message)
        })
        return ()=>{
            unsubUser()
            if(snapshot) snapshot()
        }
    },[auth])
  return {loggedInUser,error,loading}
}

export default useUser