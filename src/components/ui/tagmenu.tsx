import axios from "axios";
import { useEffect, useState } from "react"


export function TagMenu({selectedTag,setSelectedTag}:{selectedTag:Array<string>,setSelectedTag:React.Dispatch<React.SetStateAction<string[]>>}){
    // console.log("hi"+props.tags)
    const [tags,setTags] = useState();
    async function fetchTags(){
        const response = await axios.get('http://localhost:3000/api/v1/tag');
        setTags(response.data.tags);
    }
    useEffect(()=>{
        fetchTags();
    },[])

    const buttonStyle = {
        "true":"bg-purple-600 text-white",
        "false":"text-purple-500 bg-purple-300 "
    }
    
    function selectTag(item:string){
       const itemExists = selectedTag.includes(item);
       if(itemExists){
        setSelectedTag((prev) => prev.filter((value) => value !== item));
       }else{
        setSelectedTag((prev) => [...prev, item]);
       }

    }

    return<div className = {"flex "}>
        {tags?.map((item)=>{
            return <button key = {item._id} onClick = {()=>selectTag(item._id)}><div className ={`text-sm text-purple-500 bg-purple-300 px-4 py-2 px-2 rounded-2xl flex items-center my-2 mr-2 ${buttonStyle[selectedTag.includes(item._id).toString()]}`}>#{item.title}</div></button>
        })}
    </div>
}