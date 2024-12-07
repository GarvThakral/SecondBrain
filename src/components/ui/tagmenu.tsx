import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = https://second-brain-be-mc85.vercel.app/api/v1

export function TagMenu({ selectedTag, setSelectedTag }: { selectedTag: Array<string>; setSelectedTag: React.Dispatch<React.SetStateAction<string[]>> }) {
    const [tags, setTags] = useState<Array<{ _id: string, title: string }>>([]); 
    
    async function fetchTags() {
        const response = await axios.get(`${API_URL}/tag`);
        setTags(response.data.tags);
    }

    useEffect(() => {
        fetchTags();
    }, []);

    const buttonStyle: { [key: string]: string } = {
        true: "bg-purple-600 text-white",
        false: "text-purple-500 bg-purple-300"
    };

    function selectTag(item: string) {
       const itemExists = selectedTag.includes(item);

       setSelectedTag((prev) => 
           itemExists ? prev.filter((value) => value !== item) : [...prev, item]
       );
    }

    return (
        <div className={"flex"}>
            {tags?.map((item) => (
                <button key={item._id} onClick={() => selectTag(item._id)}>
                    <div className={`text-sm ${buttonStyle[selectedTag.includes(item._id).toString()]} px-4 py-2 rounded-2xl flex items-center my-2 mr-2`}>
                        #{item.title}
                    </div>
                </button>
            ))}
        </div>
    );
}
