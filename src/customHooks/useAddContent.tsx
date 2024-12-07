import axios from "axios";
import { useEffect } from "react";

interface BrainProps{
    areaText:string;
    linkText:string;
    type:"education",
    titleText:string;
    selectedTags:Array<string>
}

export function useAddContent(props:BrainProps){
    async function addBrain(){
        const token = localStorage.getItem('token') || "";
        const add = await axios.post("http://localhost:3000/api/v1/content",
            {
                text:props.areaText,
                link:props.linkText,
                type:props.type,
                title:props.titleText,
                tags:props.selectedTags
            },{
                headers:{
                    token:token
                },
            }
        )
    }
    useEffect(()=>{
        addBrain()
    },[])
}