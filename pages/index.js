import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'


const INITIAL_VALUE = {
  email:"",
  username:"",
  password : "",
  cpassword : "",
}
export default function Home() {
  const [user, setUser] = useState(INITIAL_VALUE);
  const router = useRouter()

  const inputHandler = (e)=>{
    setUser(prev=>({
      ...prev,
      [e.target.name]:e.target.value
  }))
  console.log("name",e.target.name,e.target.value)
  }

  const submitRegister = async (e)=>{
      e.preventDefault();
      const res = await fetch("api/register", {
        method : "POST",
        body : JSON.stringify({
          email: user.email,
          username : user.username,
          password : user.password
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })

      const data = await res.json();
      console.log(data)


      router.push('/login');
  }
  return (
    <>
     <h1>Sign Up</h1>
     <form onSubmit={submitRegister}>
         <input type="email" name="email" value={user.email} onChange={inputHandler} placeholder='enter email here' /> <br /> <br />
         <input type="text" name='username' value={user.username} onChange={inputHandler} placeholder='enter username'/> <br /> <br />
         <input type="password" name="password" value={user.password} onChange={inputHandler} placeholder='enter password'/> <br /> <br />
         <input type="password" name="cpassword" value={user.cpassword} onChange={inputHandler} placeholder='enter password for confiramation'/> <br /><br />
         <button type='submit'>Register</button>
         

         <h4>already have an account <Link href="/login">Login</Link></h4>
     </form>
    </>
  )
}
