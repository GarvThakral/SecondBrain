import { useEffect , useState } from 'react';


export function useFetch(url:string){
    const [ content , setContent ] = useState({ content: [] });
    const token = localStorage.getItem('token')||' ';
    async function fetchContent(){
        const response = await fetch(url,{
            headers:{
                token
            }
        });
        const json = await response.json();
        setContent(json);
        console.log(json);
    }

    useEffect(()=>{
        fetchContent();
    },[url])

    return content
}