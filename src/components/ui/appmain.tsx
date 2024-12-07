import { Link } from "react-router-dom"
import { useFetch } from "../../customHooks/useFetch"
import { Button } from "./button"
import { Card } from "./card"
import { DeleteIcon } from "./icons/deleteIcon"
import { DocumentIcon } from "./icons/documentIcon"
import { PlusIcon } from "./icons/plusIcon"
import { ShareIcon } from "./icons/shareIcon"


export function AppMain({className}:{className:string}){

    interface Tag{
        _id:string;
        title:string;
        __v:number;
    }
    interface Content{
        _id: string;  
        text:string;      
        link: string;       
        tags: Tag[];     
        title: string;      
        type: string;       
        userId: string; 
        date:string;    
        __v: number;        
    }
    interface Obj{
        content:Content[]
    }

    
    const {content = []}:Obj = useFetch("http://localhost:3000/api/v1/content");
    console.log(content);
    
    return<div className = {`min-h-screen ${className} bg-[#f8fafc] flex flex-col pt-4 p-4`}>
        <div className = {"flex justify-between"}>
            <div className ={"text-4xl b"}>
                All Notes
            </div>
            <div className ={"flex"}>
                <Link to = "/addContent" className={"flex"}><Button variant = {"primary"} size = {"sm"} text = {"Add Content"} startIcon = {<ShareIcon size = {"lg"}/>} onClick ={()=>{console.log("hi")}}></Button></Link>
                <Button variant = {"secondary"} size = {"sm"} text = {"Share Brain"} endIcon = {<PlusIcon size = {"lg"}/>} onClick ={()=>{console.log("hi")}}></Button>
            </div>
        </div>
        <div className ={'mt-6 flex flex-wrap'}>
            {content?.map((item)=>{

                return<Card type = {item.type} key = {item._id} title={item.title} text = {item.text} link = {item.link} tags = {item.tags} startIcon = {<DocumentIcon size ={"md"}/>} shareIcon = {<ShareIcon size ={"md"}/>} deleteIcon={<DeleteIcon size ={"md"}/>} date = {item.date} contentId ={item._id}/>
            })}
        </div>
    
    </div>
}