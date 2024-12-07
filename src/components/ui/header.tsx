import axios from 'axios'
interface HeaderProps{
    title:String;
    startIcon:any;
    shareIcon:any;
    deleteIcon:any;
    contentId:string;
}
export function Header(props:HeaderProps){
    async function sayHi(){
        const token = localStorage.getItem('token');
        const contentIdentity = props.contentId;
        const deleteReq = await axios.delete("http://localhost:3000/api/v1/content",{
            headers:{
                token
            },
            data:{
                contentId:contentIdentity
            }
        }
    ) 
    console.log(deleteReq)
    }
    return<div className = {"flex justify-between rounded-2xl "}>
        <div className = {'flex items-center text-lg '}><span className = {"pr-2 text-[#434651]"}>{props.startIcon}</span>{props.title}</div>
        <div className = {'flex items-center'}><span className = {"pr-2 text-[#434651]"}>{props.shareIcon}</span><span className = {"pr-2 text-[#434651] cursor-pointer"} onClick={()=>sayHi()}>{props.deleteIcon}</span></div>
    </div>
}
