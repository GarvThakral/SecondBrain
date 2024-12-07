import { Button } from "./button";
import { BrainIcon } from "./icons/brainIcon";
import { DocumentIcon } from "./icons/documentIcon";
import { ShareIcon } from "./icons/shareIcon";
import { TagIcon } from "./icons/tagIcon";
import { TwitterIcon } from "./icons/twitterIcon";
import { VideoIcon } from "./icons/VideoIcon";
import { BrowserRouter , Router , Route , Link } from 'react-router-dom'
import { Input } from "./input";


export function SideBar({ className }: { className: string }) {
  return (
      <div className={`min-h-screen ${className} flex flex-col items-start p-3 bg-[#fffefe] drop-shadow-md`}>
        <Link to = "/"><div className="text-2xl flex items-center py-4 mb-4">
          <BrainIcon size={"lg"} />
          <span className="ml-2">Garv's Brain</span>
        </div>
        </Link>
        <Link to = "/content/tweets"><div className="p-2 flex items-center text-lg space-x-2">
          <TwitterIcon size={"lg"} />
          <span>Tweets</span>
        </div></Link>
        <Link to = "/content/"><div className="p-2 flex items-center text-lg space-x-2">
          <VideoIcon size={"lg"} />
          <span>Videos</span>
        </div></Link>
        <Link to = "/content/"><div className="p-2 flex items-center text-lg space-x-2">
          <ShareIcon size={"lg"} />
          <span>Links</span>
        </div></Link>
        <Link to = "/content/"><div className="p-2 flex items-center text-lg space-x-2">
          <TagIcon size={"lg"} />
          <span>Tags</span>
        </div></Link>
        <Link to = "/signin"><Button variant={"primary"} size= {"sm"} text = {"Sign In"} onClick = {()=>{}} /></Link>
      </div>
    );
  }
