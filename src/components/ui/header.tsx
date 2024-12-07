const API_URL = import.meta.env.VITE_API_URL;

interface HeaderProps{
    title:String;
    startIcon:any;
    shareIcon:any;
    deleteIcon:any;
    contentId:string;
    onDel:(contentId:string)=>void;
}
export function Header(props:HeaderProps){
    
    
    return<div className = {"flex justify-between rounded-2xl "}>
        <div className = {'flex items-center text-lg '}><span className = {"pr-2 text-[#434651]"}>{props.startIcon}</span>{props.title}</div>
        <div className = {'flex items-center'}><span className = {"pr-2 text-[#434651]"}>{props.shareIcon}</span><span className = {"pr-2 text-[#434651] cursor-pointer"} onClick={()=>props.onDel(props.contentId)}>{props.deleteIcon}</span></div>
    </div>
}
