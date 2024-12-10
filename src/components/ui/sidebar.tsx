import { Button } from "./button";
import { BrainIcon } from "./icons/brainIcon";
import { ShareIcon } from "./icons/shareIcon";
import { TagIcon } from "./icons/tagIcon";
import { TwitterIcon } from "./icons/twitterIcon";
import { VideoIcon } from "./icons/VideoIcon";
import { SignIn } from "./signin";
import { SignUp } from "./signup";
import { SigninIcon } from "./icons/signin";
import { useEffect, useState } from "react";

interface SideBarProps {
  className: string;
  signinState: boolean;
  toggleSigninState: (prevState: boolean) => void;
  signupState: boolean;
  toggleSignupState: (prevState: boolean) => void;
  isLoggedIn: boolean;
  toggleIsLoggedIn: (prevState: boolean) => void;
}

export function SideBar(props:SideBarProps) {
  const [userName,setUserName] = useState("");

  function logOut(){
    localStorage.clear();
    props.toggleIsLoggedIn(!props.isLoggedIn)
  }
  useEffect(()=>{
    setUserName(localStorage.getItem('username') || "");
  })

  return (
    <div className={`min-h-screen ${props.className} flex flex-col justify-between p-3 bg-[#fffefe] drop-shadow-md items-center`}>
        {props.signinState ? <SignIn signinState={props.signinState} toggleSigninState={props.toggleSigninState} signupState = {props.signupState} toggleSignupState = {props.toggleSignupState} userName = {userName} setUserName = {setUserName} isLoggedIn ={props.isLoggedIn} toggleIsLoggedIn = {props.toggleIsLoggedIn} />:null}
        {props.signupState ? <SignUp signinState={props.signinState} toggleSigninState={props.toggleSigninState} signupState = {props.signupState} toggleSignupState = {props.toggleSignupState}/>:null}
        <div className = "flex flex-col items-center">
          <div className="md:text-2xl sm:text-lg flex items-center py-4 mb-4 ">
            <BrainIcon />
            <span className="ml-2 hidden sm:block">{userName===""? "Second":userName} Brain</span>
          </div>
          <div className="p-2 flex items-center md:text-xl sm:text-lg space-x-2">
            <TwitterIcon size={"lg"} />
            <span className = "hidden sm:block">Tweets</span>
          </div>
         <div className="p-2 flex items-center md:text-xl sm:text-lg space-x-2">
            <VideoIcon size={"lg"} />
            <span className = "hidden sm:block">Videos</span>
          </div>
         <div className="p-2 flex items-center md:text-xl sm:text-lg space-x-2">
            <ShareIcon size={"lg"} />
            <span className = "hidden sm:block">Links</span>
          </div>
         <div className="p-2 flex items-center md:text-xl sm:text-lg space-x-2">
            <TagIcon size={"lg"} />
            <span className = "hidden sm:block">Tags</span>
          </div>
        </div>
        <div>
          {props.isLoggedIn ? <Button variant={"primary"} size= {"md"} text = {"Log out"} onClick = {()=>logOut()} startIcon={<SigninIcon size={"lg"}/>}/>:<Button variant={"primary"} size= {"md"} text = {"Sign In"} onClick = {()=>{props.toggleSigninState(!props.signinState)}} startIcon={<SigninIcon size={"lg"}/>}/>}
        </div>
      </div>
    );
  }
