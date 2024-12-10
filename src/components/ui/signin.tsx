import { Button } from "./button";
import { Input } from "./input";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Loader } from "./icons/loader";
const API_URL = "https://second-brain-be-mc85.vercel.app/api/v1"

interface signinProps{
  signinState:boolean
  toggleSigninState:(prevState: boolean) => void;
  signupState:boolean
  toggleSignupState:(prevState: boolean) => void;
  userName:string;
  setUserName:(prevState: string) => void
  isLoggedIn:boolean
  toggleIsLoggedIn:(prevState: boolean) => void
}

export function SignIn(props:signinProps) {
  const [loaderState,setLoaderState] = useState(false);
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
    setLoaderState(true)
    const response = await axios.post(`${API_URL}/user/signin`,{
      email,password
    })
    setLoaderState(false)
    if(response.status == 200){
      console.log(response);
      props.setUserName(response.data.username);
      props.toggleSigninState(false)
      props.toggleIsLoggedIn(!props.isLoggedIn);
    }
    localStorage.setItem('token',response.data.token)
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen col-span-10 fixed top-0 left-0 w-screen bg-slate-50 bg-opacity-50 backdrop-blur-sm">
        {loaderState ? <Loader/>:null}
      <div ref = {signinRef } className = {"bg-[#fffefe] w-[95%] max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px] h-[600px] md:h-[500px] sm:h-[400px] flex flex-col items-center justify-between drop-shadow-lg py-8 px-6 rounded-xl"}>
        <span className = {"text-lg sm:text-xl text-center"}>Sign In Page</span>
        <span className = {"text-lg sm:text-xl text-center"}>"Your Second Brain: Think Less, Achieve More."</span>
        <Input variant = {"secondary"} size = {"lg"} placeholder="email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}/>        
        <Input variant = {"secondary"} size = {"lg"} placeholder="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>   
        <Button variant = {"primary"} size = {"lg"} text = {"Sign in"} onClick ={()=>{signUserIn()}}/>     
        <span>Dont have an account ?<span onClick = {()=>switchSignup()} className = "text-purple-500">Sign up </span>instead</span>
      </div>
    </div>
  );
  }
  