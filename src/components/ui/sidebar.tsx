import { Button } from "./button";
import { BrainIcon } from "./icons/brainIcon";
import { ShareIcon } from "./icons/shareIcon";
import { TwitterIcon } from "./icons/twitterIcon";

import { VideoIcon } from "./icons/VideoIcon";
import { SignIn } from "./signin";
import { SignUp } from "./signup";
import { SigninIcon } from "./icons/signin";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "https://second-brain-be-mc85.vercel.app/api/v1"


interface Tag {
  _id: string;
  title: string;
  __v: number;
}
interface Content {
  _id: string;
  text: string;
  link: string;
  tags: Tag[];
  title: string;
  type: string;
  userId: string;
  date: string;
  __v: number;
}

interface SideBarProps {
  className: string;
  signinState: boolean;
  toggleSigninState: (prevState: boolean) => void;
  signupState: boolean;
  toggleSignupState: (prevState: boolean) => void;
  isLoggedIn: boolean;
  toggleIsLoggedIn: (prevState: boolean) => void;
  contentState:Content[]
  setContentState:(state: Content[] | ((prevState: Content[]) => Content[])) => void;
}

export function SideBar(props:SideBarProps) {
  const [userName,setUserName] = useState("");

  function logOut(){
    localStorage.clear();
    props.toggleIsLoggedIn(!props.isLoggedIn)
  }
  async function sortContent(type:string){
    try{
      const content = await axios.get(`${API_URL}/content/${type}`,{
        headers:{
          token:localStorage.getItem('token') || ""
        }
      });
      console.log(content.data.content)
      props.setContentState(content.data.content)

    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    setUserName(localStorage.getItem('username') || "");
  })

  return (
    <div className={`min-h-screen ${props.className} flex flex-col justify-between p-3 bg-[#fffefe] drop-shadow-md items-center`}>
        {props.signinState ? <SignIn signinState={props.signinState} toggleSigninState={props.toggleSigninState} signupState = {props.signupState} toggleSignupState = {props.toggleSignupState} userName = {userName} setUserName = {setUserName} isLoggedIn ={props.isLoggedIn} toggleIsLoggedIn = {props.toggleIsLoggedIn} />:null}
        {props.signupState ? <SignUp signinState={props.signinState} toggleSigninState={props.toggleSigninState} signupState = {props.signupState} toggleSignupState = {props.toggleSignupState}/>:null}
        <div className = "flex flex-col items-center">
          <div onClick = {()=>{sortContent("")}} className="md:text-2xl sm:text-lg flex items-center py-4 mb-4 cursor-pointer ">
            <BrainIcon />
            <span className="ml-2 hidden sm:block">{userName===""? "Second":`${userName}'s`} Brain</span>
          </div>
          <div onClick = {()=>{sortContent("Tweet")}} className="p-2 flex items-center md:text-xl sm:text-lg space-x-2 cursor-pointer">
            <TwitterIcon size={"lg"} />
            <span className = "hidden sm:block">Tweets</span>
          </div>
         <div onClick = {()=>{sortContent("Video")}} className="p-2 flex items-center md:text-xl sm:text-lg space-x-2 cursor-pointer">
            <VideoIcon size={"lg"} />
            <span className = "hidden sm:block">Videos</span>
          </div>
         <div onClick = {()=>{sortContent("Links")}} className="p-2 flex items-center md:text-xl sm:text-lg space-x-2 cursor-pointer">
            <ShareIcon size={"lg"} />
            <span className = "hidden sm:block">Other</span>
          </div>
        </div>
        <div>
          {props.isLoggedIn ? <Button variant={"primary"} size= {"md"} text = {"Log out"} onClick = {()=>logOut()} startIcon={<SigninIcon size={"lg"}/>}/>:<Button variant={"primary"} size= {"md"} text = {"Sign In"} onClick = {()=>{props.toggleSigninState(!props.signinState)}} startIcon={<SigninIcon size={"lg"}/>}/>}
        </div>
      </div>
    );
  }
