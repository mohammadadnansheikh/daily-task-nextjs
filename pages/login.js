
import Link from "next/link";
import { useEffect, useState } from "react";
import Userdashboard from "../components/userdashboard";

const INITIAL_VALUE = {
  username: "",
  password: "",
};
const login = () => {
  const [user, setUser] = useState(INITIAL_VALUE);
  const [isactive, setIsActive] = useState(false);
  const [isUser, setIsUser] = useState("")



  // useEffect(()=>{

  // }, [isUser])

  const inputHandler = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log("name", e.target.name, e.target.value);
  };
  const loginSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      setIsUser(data)
       setIsActive(true);
    }
  };
  return (
    <>

     {
      isactive ? <Userdashboard isUser={isUser}/> :   <>   <h1>Sign In</h1>
      <form onSubmit={loginSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={inputHandler}
          placeholder="enter username"
        />{" "}
        <br /> <br />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={inputHandler}
          placeholder="enter password"
        />{" "}
        <br /> <br />
        <div>
          <input type="checkbox" /> <span>remember me</span>
          <br /> <Link href="/forgotpassword">forget password</Link> <br />
        </div>
        <button type="submit">Login</button>
        <h4>
          Dont have account <Link href="/">Register</Link>
        </h4>
      </form> </> 
     }

    </>
  );
};

export default login;
