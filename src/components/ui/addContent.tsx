import { useRef, useState } from "react";
import { Input } from "./input";
import { TextArea } from "./textarea";
import { Button } from "./button";
import { PlusIcon } from "./icons/plusIcon";
import { SelectArea } from "./selectArea";
import { TagMenu } from "./tagmenu";
import axios from "axios";
import { useAddContent } from "../../customHooks/useAddContent";

interface Tag {
    _id: string;
    title: string;    
    __v: number;      
}

interface ContentProps{
    tags?:Tag[];
}


export function AddContent(props:ContentProps){
    const [areaText,setAreaText] = useState('');
    const [titleText,setTitleText] = useState('');
    const [linkText,setLinkText] = useState('');
    const [selectText,setSelectText] = useState('Tweet');
    function setText(e:React.ChangeEvent<HTMLTextAreaElement>){
        setAreaText(e.target.value);
    }
    function changeTitleText(e:React.ChangeEvent<HTMLInputElement>){
        setTitleText(e.target.value);
    }
    function changeLinkText(e:React.ChangeEvent<HTMLInputElement>){
        setLinkText(e.target.value);
    }
    function changeSelectText(e:React.ChangeEvent<HTMLSelectElement>){
        console.log(e.target.value)
        setSelectText(e.target.value);
    }
    const [selectedTag, setSelectedTag] = useState([]);
    async function addBrain(){
        console.log("Selected item is " + selectText)
        const token = localStorage.getItem('token') || "";
        const add = await axios.post("http://localhost:3000/api/v1/content",
            {
                text:areaText,
                link:linkText,
                type:selectText,
                title:titleText,
                tags:selectedTag
            },{
                headers:{
                    token:token
                },
            }
        )
        console.log(add);
    }
    
    return(
        <div className ={"flex flex-col justify-center items-center min-h-screen col-span-10 "}>
            <div className = {"flex justify-evenly items-center flex-col w-[500px] h-[700px] drop-shadow-sm"}>
                <Input variant ={"secondary"} placeholder ={"Post Title"} size ={"lg"} onChange = {(e)=>changeTitleText(e)}/>
                <Input variant ={"secondary"} placeholder ={"Post Link"} size ={"lg"} onChange = {(e)=>changeLinkText(e)}/>
                <SelectArea size = {"lg"} variant = {"secondary"} options ={["Tweet","Video","Link"]} onChange = {(e)=>{changeSelectText(e)}} />
                <TextArea variant ={"secondary"} size ={"md"} onChange ={(e)=>setText(e)}/>
                <TagMenu selectedTag = {selectedTag} setSelectedTag = {setSelectedTag} />
                <Button variant = {"primary"} size = {"lg"} text = {"Add Post"} endIcon = {<PlusIcon size = {"lg"}/>} onClick ={()=>addBrain()}></Button>
            </div>
        </div>
    )
}