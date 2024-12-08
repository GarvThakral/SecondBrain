import { useState } from "react";
import { Button } from "./button";
import { BrainIcon } from "./icons/brainIcon";
import { ShareIcon } from "./icons/shareIcon";
import { TagIcon } from "./icons/tagIcon";
import { TwitterIcon } from "./icons/twitterIcon";
import { VideoIcon } from "./icons/VideoIcon";
import { Link } from 'react-router-dom'
import { SignIn } from "./signin";


export function SideBar({ className }: { className: string }) {
  const [signinState,toggleSigninState] = useState(false);
  return (
    <div className={`min-h-screen ${className} flex flex-col p-3 bg-[#fffefe] drop-shadow-md items-center`}>
        {signinState ? <SignIn />:null}
        <Link to = "/"><div className="md:text-2xl sm:text-lg flex items-center py-4 mb-4 ">
          <BrainIcon />
          <span className="ml-2 hidden sm:block">Garv's Brain</span>
        </div>
        </Link>
        <Link to = "/content/tweets"><div className="p-2 flex items-center md:text-xl sm:text-lg space-x-2">
          <TwitterIcon size={"lg"} />
          <span className = "hidden sm:block">Tweets</span>
        </div></Link>
        <Link to = "/content/"><div className="p-2 flex items-center md:text-xl sm:text-lg space-x-2">
          <VideoIcon size={"lg"} />
          <span className = "hidden sm:block">Videos</span>
        </div></Link>
        <Link to = "/content/"><div className="p-2 flex items-center md:text-xl sm:text-lg space-x-2">
          <ShareIcon size={"lg"} />
          <span className = "hidden sm:block">Links</span>
        </div></Link>
        <Link to = "/content/"><div className="p-2 flex items-center md:text-xl sm:text-lg space-x-2">
          <TagIcon size={"lg"} />
          <span className = "hidden sm:block">Tags</span>
        </div></Link>
        <Button variant={"primary"} size= {"sm"} text = {"Sign In"} onClick = {()=>{toggleSigninState(c=>!c)}} />
      </div>
    );
  }
