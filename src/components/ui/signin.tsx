  import { Button } from "./button";
  import { Input } from "./input";
  import { useEffect, useRef, useState } from 'react';
  import axios from 'axios';
  const API_URL = "http://localhost:3000/api/v1"

  interface signinProps{
    signinState:boolean
    toggleSigninState:(prevState: boolean) => void;
    signupState:boolean
    toggleSignupState:(prevState: boolean) => void;
  }

  export function SignIn(props:signinProps) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const signinRef  = useRef<HTMLDivElement>(null);
    
    function switchSignup(){
      console.log("Hello")
      props.toggleSigninState(false)
      props.toggleSignupState(true)
      
    }

    function handleClickListener(e:MouseEvent){
      if (signinRef.current && !signinRef.current.contains(e.target as Node)) {
        props.toggleSigninState(false);
      }
    }
    useEffect(()=>{
      document.addEventListener("mousedown",handleClickListener);
      return ()=>{
        document.removeEventListener("mousedown",handleClickListener)
      }
    },[])
    async function signUserIn(){
      const response = await axios.post(`${API_URL}/user/signin`,{
        email,password
      })
      console.log(response);
      localStorage.setItem('token',response.data.token)
    }
    

    return (
      <div className="flex justify-center items-center min-h-screen col-span-10 fixed top-0 left-0 w-screen bg-slate-50 bg-opacity-50 backdrop-blur-sm">
        <div ref = {signinRef } className = {"bg-[#fffefe] w-[500px] h-[600px] flex flex-col items-center justify-evenly drop-shadow-lg py-3  rounded-2xl"}>
          <span className = {"text-2xl"}>Sign In Page</span>
          <span className = {"text-1xl"}>"Your Second Brain: Think Less, Achieve More."</span>
          <Input variant = {"secondary"} size = {"lg"} placeholder="email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}/>        
          <Input variant = {"secondary"} size = {"lg"} placeholder="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>   
          <Button variant = {"primary"} size = {"lg"} text = {"Sign in"} onClick ={()=>{signUserIn()}}/>     
          <span>Dont have an account ?<span onClick = {()=>switchSignup()} className = "text-purple-500">Sign up </span>instead</span>
        </div>
      </div>
    );
    }
    