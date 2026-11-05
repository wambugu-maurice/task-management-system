import {  signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowRoundForward } from "react-icons/io";


function Login() {
  const [userForm, setUserForm] = useState({
      email: "",
      password: "",
    });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

   const navigate = useNavigate();

  function handleFieldUpdate(e) {
    const { name, value } = e.target;
    setUserForm((formIput) => ({ ...formIput ,[name]: value}));
    setError({});
  }

  async function handleLogin(e) {
    e.preventDefault();

    setError({});
    setLoading(true);

    const newErrors = {};
    const {  email, password } = userForm;
    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    }
    if (!password) {
      newErrors.password = "Please enter your password";
    }
    setError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredentials.user) {
        navigate("/home")
        toast.success("Login successfull")
        
        }
         } catch (err) {
      setError({ general: err.message });
    } finally {
      setLoading(false);
    }}

  async function handleLoginWithGoogle() {
    const provider = new GoogleAuthProvider();
    setError({});
    setIsGoogleLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          navigate("/home");
          toast.success("Login succefull");
          
          }}).catch((err) => {
        setError({ general: err.message });
      });
        
    }
      
  
  return (
    <section className="authDiv">
          <div className="leftSide ">
            <h2>
              Create and manage projects in one place. Add new projects and teams
            </h2>
          </div>
          <div className="rightPage login">
            <div className="formErrorContainer">
              {error.general && <p>{error.message}</p>}
            </div>
            <div className="header">
              <h2>Login</h2>
              <p>Login in Project Manager</p>
            </div>
            <div className="signUpWithGoogle">
              <button onClick={handleLoginWithGoogle} disabled={isGoogleLoading}>
                {isGoogleLoading ? (
                  "signing in..."
                ) : (
                  <>
                    <FcGoogle className="gBtn" /> Signup with Google
                  </>
                )}
              </button>
            </div>
            <div className="formDiv">
              <form onSubmit={handleLogin}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    value={userForm.email}
                    onChange={handleFieldUpdate}
                  />
                  <div className="formErrorContainer">
                    {error.email && <p>{error.email}</p>}
                  </div>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={userForm.password}
                    onChange={handleFieldUpdate}
                  />
                  <div className="formErrorContainer">
                    {error.password && <p>{error.password}</p>}
                  </div>
                </FormControl>
                <button disabled={loading} type="submit">
                  {loading ? (
                    "Logining..."
                  ) : (
                    <>
                      <IoIosArrowRoundForward className="authBtn" />
                      Login
                    </>
                  )}
                </button>
                <h2 className="authFooter">Don't have an account? <Link className='aLink' to='/signup'>Signup</Link></h2>
              </form>
            </div>
          </div>
        </section>
  )
}

export default Login