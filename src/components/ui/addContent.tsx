import { useState } from "react";
import { Input } from "./input";
import { TextArea } from "./textarea";
import { Button } from "./button";
import { PlusIcon } from "./icons/plusIcon";
import { SelectArea } from "./selectArea";
import { TagMenu } from "./tagmenu";
import axios from "axios";
import { Loader } from "./icons/loader";
const API_URL = "https://second-brain-be-mc85.vercel.app/api/v1"

interface Tag {
    _id: string;
    title: string;
    __v: number;
}
interface Content {
    _id: string;
    text: string;
    link: string;
    tags: Tag[];
    title: string;
    type: string;
    userId: string;
    date: string;
    __v: number;
}

interface addContentProps{
    addContent:boolean
    setAddContent:(prevState: boolean) => void;
    contentState: Content[]; // Array of Content objects
    setContentState: React.Dispatch<React.SetStateAction<Content[]>>;
}
export function AddContent(props:addContentProps) {
    const [loaderState,setLoaderState] = useState(false);
    const [areaText, setAreaText] = useState('');
    const [titleText, setTitleText] = useState('');
    const [linkText, setLinkText] = useState('');
    const [selectText, setSelectText] = useState('Tweet');
    const [selectedTag, setSelectedTag] = useState<string[]>([]); // Correctly typed as an array of strings
    
    function setText(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setAreaText(e.target.value);
    }

    function changeTitleText(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleText(e.target.value);
    }

    function changeLinkText(e: React.ChangeEvent<HTMLInputElement>) {
        setLinkText(e.target.value);
    }

    function changeSelectText(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectText(e.target.value);
    }

    async function addBrain() {
        const token = localStorage.getItem('token') || "";
        setLoaderState(true)
        const response = await axios.post(`${API_URL}/content`,
            {
                text: areaText,
                link: linkText,
                type: selectText,
                title: titleText,
                tags: selectedTag
            },
            {
                headers: {
                    token: token
                },
            }
        );
        const content = await axios.get(`${API_URL}/content`, {
            headers: { token: token },
        });
        setLoaderState(false);
        console.log(content.data.content)
        props.setContentState(content.data.content);
        if(response.status == 200){
            props.setAddContent(false);
        }
    }
    
    return (
        <div className={"flex flex-col justify-center items-center min-h-[80vh] col-span-10 w-full"}>
        {loaderState ? <Loader/>:null}
            <div className={"flex justify-evenly items-center flex-col sm:w-[500px] min-h-[80vh] shadow-lg w-[300px]"}>
                <Input variant={"secondary"} placeholder={"Post Title"} size={"md"} onChange={(e) => changeTitleText(e)} />
                <Input variant={"secondary"} placeholder={"Post Link"} size={"md"} onChange={(e) => changeLinkText(e)} />
                <SelectArea size={"md"} variant={"secondary"} options={["Tweet", "Video", "Link"]} onChange={(e) => { changeSelectText(e) }} />
                <TextArea variant={"secondary"} size={"sm"} onChange={(e) => setText(e)} />
                <TagMenu selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
                <Button variant={"primary"} size={"lg"} text={"Add Post"} endIcon={<PlusIcon size={"lg"} />} onClick={() => addBrain()}></Button>
            </div>
        </div>
    );
}
