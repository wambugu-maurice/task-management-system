import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GoogleAuthProvider } from "firebase/auth";

function Signup() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  function handleFieldUpdate(e) {
    const { name, value } = e.target;
    setUserForm((formIput) => ({...formIput, [name]: value }));
    setError({});
  }

  async function handleSignUp(e) {
    e.preventDefault();

    setError({});
    setLoading(true);

    const newErrors = {};
    const { name, email, password1, password2 } = userForm;
    if (!name.trim()) {
      newErrors.name = "Please enter your username";
    }
    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    }
    if (!password1) {
      newErrors.password1 = "Please enter your password";
    }
    if (!password2) {
      newErrors.password2 = "Please confirm your password";
    }
    if (password1 !== password2) {
      newErrors.password2 = "Passwords do not match";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password1,
      );
      if (userCredentials.user) {
        const newUser = {
          name,
          email,
          role: "dev",
          userId: userCredentials.user.uid,
          registeredOn: userCredentials.user.metadata.creationTime,
        };
        const docRef = doc(db, "users", userCredentials.user.uid);
        await setDoc(docRef, newUser);
        navigate("/home");
        toast.success("Account created");
      }
    } catch (err) {
      setError({ general: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUpWithGoogle() {
    const provider = new GoogleAuthProvider();
    setError({});
    setIsGoogleLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          const newUser = {
            name: user.displayName,
            email: user.email,
            userId: user.uid,
            registeredOn: user.metadata.creationTime,
          };
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, newUser);
          navigate("/home");
          toast.success("Account created");
        }
      })
      .catch((err) => {
        setError({ general: err.message });
      });
  }

  return (
    <section className="authDiv">
      <div className="leftSide">
        <h2>
          Create and manage projects in one place. Add new projects and teams
        </h2>
      </div>
      <div className="rightPage">
        <div className="formErrorContainer">
          {error.general && <p>{error.message}</p>}
        </div>
        <div className="header">
          <h2>Sign Up</h2>
          <p>Create an account with Project Manager</p>
        </div>
        <div className="signUpWithGoogle">
          <button onClick={handleSignUpWithGoogle} disabled={isGoogleLoading}>
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
          <form onSubmit={handleSignUp}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="name"
                value={userForm.name}
                onChange={handleFieldUpdate}
              />
              <div className="formErrorContainer">
                {error.name && <p>{error.name}</p>}
              </div>
            </FormControl>
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
                name="password1"
                value={userForm.password1}
                onChange={handleFieldUpdate}
              />
              <div className="formErrorContainer">
                {error.password1 && <p>{error.password1}</p>}
              </div>
            </FormControl>
            <FormControl>
              <FormLabel>Confirm passowrd</FormLabel>
              <Input
                type="password"
                name="password2"
                value={userForm.password2}
                onChange={handleFieldUpdate}
              />
              <div className="formErrorContainer">
                {error.password2 && <p>{error.password2}</p>}
              </div>
            </FormControl>
            <button disabled={loading} type="submit">
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  <IoIosArrowRoundForward className="authBtn" />
                  Signup
                </>
              )}
            </button>
            <h2 className="authFooter">Already have an account? <Link className='aLink' to='/login'>Login</Link></h2>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
