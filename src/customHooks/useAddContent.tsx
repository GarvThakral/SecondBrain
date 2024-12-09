import axios from "axios";
import { useEffect } from "react";
const API_URL = "https://second-brain-be-mc85.vercel.app/api/v1"


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
        await axios.post(`${API_URL}/content`,
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