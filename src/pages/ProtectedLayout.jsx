import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate, Outlet } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { auth } from "../firebase"
import Loader from "../components/Loader"

function ProtectedLayout() {
  const[loggedInUser,setLoggedInUser]=useState(null)
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState("")

  useEffect(()=>{
    const unsubUser = onAuthStateChanged(auth,async(user)=>{
        if(!user) setLoggedInUser(null);
        setLoggedInUser(!!user)
        setLoading(false)
    },(err)=>{
      setError(err.message)
      setLoading(false)
    })

    return ()=> unsubUser()
  },[])

  if(loading) return <Loader />
  if(error) return <ErrorMessage error={error} />
  if(!loggedInUser) return <Navigate to='/login' replace />

  return (
    <Outlet />
  )
}

export default ProtectedLayout