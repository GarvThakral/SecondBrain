import { Button } from "./button";
import { Input } from "./input";
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_URL = process.env.VITE_API_URL;


export function SignUp() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function signUserUp(){
    const response = await axios.post(`${API_URL}/signup`,{
      username,email,password
    })
    console.log(response);
    localStorage.setItem('token',response.data.token)
  }
  return (
    <div className="flex justify-center items-center min-h-screen col-span-10">
      <div className = {"bg-[#fffefe] w-[500px] h-[600px] flex flex-col items-center justify-evenly drop-shadow-lg py-3"}>
        <span className = {"text-2xl"}>Sign up Page</span>
        <span className = {"text-1xl"}>"Your Second Brain: Think Less, Achieve More."</span>
        <Input variant = {"secondary"} size = {"lg"} placeholder="username" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUsername(e.target.value)}}/>        
        <Input variant = {"secondary"} size = {"lg"} placeholder="email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}/>        
        <Input variant = {"secondary"} size = {"lg"} placeholder="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>   
        <Button variant = {"primary"} size = {"lg"} text = {"Sign up"} onClick ={()=>{signUserUp()}}/>     
        <span>Dont have an account ? Sign up instead</span>
        <Link to = "/signin"><Button variant = {"primary"} size = {"lg"} text = {"Sign in"} onClick ={()=>{}}/></Link>
      </div>
    </div>
  );
  }
  