import Link from "next/link";
import { useEffect, useState } from "react";


const Userdashboard = ({isUser}) => {
  console.log("Userdashboard", isUser)
  const [data, setData] = useState("")
  const [todos, setTodos] = useState(["adnan", "faizan"]);


  
 
  useEffect(()=>{
     fetch("/api/todos", {
      method : "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Authorization': `Basic ${isUser.username}: ${isUser.password}`
      },
      body : JSON.stringify({
        todos: todos
      }),
    
    }).then((res)=>res.json())

   
  }, [todos])
 

  const addTodo = (e)=>{
    e.preventDefault()
    if(!data) return
    setTodos(prev=>[...prev, data])
    setData("");
    
  }

  const inputHandler = (e) => {
    setData(e.target.value)
    
  };
  return (
    <>
    
      Welcome {isUser.username} 
      <br />
      <br />
      <ul>
        {todos &&
          todos.map((val, index) => {
            return <li key={index}>{val}</li>;
          })}
      </ul>
      <form onSubmit={addTodo}>
        <input
          type="text"
          name="dailytask"
          value={data}
          onChange={inputHandler}
          placeholder="Add task"
        />{" "}
        <br /> <br />
        <button type="submit">Add New Task</button>
      </form>
      <Link href="/login">Log Out</Link>
    </>
  );
};

export default Userdashboard;
