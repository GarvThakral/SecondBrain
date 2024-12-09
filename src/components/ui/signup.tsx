import { Button } from "./button";
import { Input } from "./input";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const API_URL = "http://localhost:3000/api/v1"
console.log(API_URL);


interface signupProps{
  signinState:boolean
  toggleSigninState:(prevState: boolean) => void;
  signupState:boolean
  toggleSignupState:(prevState: boolean) => void;
}

export function SignUp(props:signupProps) {

  function switchSignup(){
    console.log("Hello")
    props.toggleSignupState(false)
    props.toggleSigninState(true)
    
  }

  function handleClickListener(e:MouseEvent){
    if (signupRef.current && !signupRef.current.contains(e.target as Node)) {
      props.toggleSignupState(false);
    }
  }
  useEffect(()=>{
    document.addEventListener("mousedown",handleClickListener);
    return ()=>{
      document.removeEventListener("mousedown",handleClickListener)
    }
  },[])

  const signupRef = useRef<HTMLDivElement>(null);

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function signUserUp(){
    const response = await axios.post(`${API_URL}/user/signup`,{
      username,email,password
    })
    console.log(response);
    localStorage.setItem('token',response.data.token)
  }
  return (
    <div className="flex justify-center items-center min-h-screen col-span-10 fixed top-0 left-0 w-screen bg-slate-50 bg-opacity-50 backdrop-blur-sm">
      <div ref = {signupRef} className = {"bg-[#fffefe] w-[95%] max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px] h-[600px] md:h-[500px] sm:h-[400px] flex flex-col items-center justify-between drop-shadow-lg py-8 px-6 rounded-xl"}>
        <span className = {"text-lg sm:text-xl text-center"}>Sign up Page</span>
        <span className = {"text-lg sm:text-xl text-center"}>"Your Second Brain: Think Less, Achieve More."</span>
        <Input variant = {"secondary"} size = {"lg"} placeholder="username" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUsername(e.target.value)}}/>        
        <Input variant = {"secondary"} size = {"lg"} placeholder="email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}/>        
        <Input variant = {"secondary"} size = {"lg"} placeholder="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>   
        <Button variant = {"primary"} size = {"lg"} text = {"Sign up"} onClick ={()=>{signUserUp()}}/>     
        <Button variant = {"primary"} size = {"lg"} text = {"Sign in"} onClick ={()=>{switchSignup}}/>
      </div>
    </div>
  );
  }
  