import { useRef, useState } from "react";
import { CopiedText } from "./copiedText";


interface HeaderProps{
    title:String;
    link:string;
    startIcon:any;
    shareIcon:any;
    deleteIcon:any;
    contentId:string;
    onDel:(contentId:string)=>void;
}
export function Header(props:HeaderProps){
    const [copiedState,setCopiedState] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null); 
    function copyLink(link:string){
        if (link !== "") {
            navigator.clipboard.writeText(link); 
        } else {
            console.log("No link to copy");
        }

        setCopiedState((prevState) => !prevState);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setCopiedState((prevState) => !prevState);
            timerRef.current = null; 
        }, 3000);

    }
    return<div className = {"flex justify-between rounded-2xl "}>
        {copiedState ? <CopiedText text="some string" />:null}
        <div className = {'flex items-center text-lg '}><span className = {"pr-2 text-[#434651]"}>{props.startIcon}</span>{props.title}</div>
        <div className = {'flex items-center'}><span className = {"pr-2 text-[#434651] cursor-pointer"} onClick = {()=>copyLink(props.link)}>{props.shareIcon}</span><span className = {"pr-2 text-[#434651] cursor-pointer"} onClick={()=>props.onDel(props.contentId)}>{props.deleteIcon}</span></div>
    </div>
}
