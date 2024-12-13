import { useFetch } from "../../customHooks/useFetch"
import { Button } from "./button"
import { Card } from "./card"
import { DeleteIcon } from "./icons/deleteIcon"
import { DocumentIcon } from "./icons/documentIcon"
import { PlusIcon } from "./icons/plusIcon"
import { ShareIcon } from "./icons/shareIcon"
import { useEffect, useState } from "react"
import axios from "axios"
import { AddContent } from "./addContent"
import { motion } from "framer-motion";
const API_URL = "https://second-brain-be-mc85.vercel.app/api/v1"

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
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
interface mainProps{
    contentState:Content[]
    setContentState:(state: Content[] | ((prevState: Content[]) => Content[])) => void;
}

export function AppMain(props:mainProps) {
    const [addContent,setAddContent] = useState(false);
    
    const { content = [] } = useFetch(`${API_URL}/content`);

    useEffect(() => {
        props.setContentState(content);
    }, [content]);

    async function deleteCard(cardId: string): Promise<void> {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/content`, {
                headers: {
                    token
                },
                data: {
                    contentId: cardId 
                }
            });
            props.setContentState(prevContent => prevContent.filter((item) => item._id !== cardId));
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    return (
        <div className={`min-h-screen bg-[#f8fafc] flex flex-col pt-4 p-4`}>
            <div className={"flex justify-between"}>
                <div className={"text-2xl md:text-4xl b"}>
                    All Notes
                </div>
                <div className={"flex"}>
                    <Button variant={"primary"} size={"lg"} text={"Add Content"} startIcon={<ShareIcon size={"lg"} />} onClick={() => {setAddContent(c=>!c)}}></Button>
                    <Button variant={"secondary"} size={"lg"} text={"Share Brain"} endIcon={<PlusIcon size={"lg"} />} onClick={() => { console.log("hi") }}></Button>
                </div>
            </div>
            <div className={'mt-6 flex flex-wrap'}>
                {addContent ? <AddContent setAddContent = {setAddContent} addContent={addContent} contentState = {props.contentState} setContentState ={props.setContentState} /> : null}
                {addContent ? null:props.contentState?.map((item,index) => (
                    <motion.div
                        key={item._id}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={cardVariants}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                    <Card
                        type={item.type}
                        key={item._id}
                        title={item.title}
                        text={item.text}
                        link={item.link}
                        tags={item.tags}
                        startIcon={<DocumentIcon size={"md"} />}
                        shareIcon={<ShareIcon size={"md"} />}
                        deleteIcon={<DeleteIcon size={"md"} />}
                        date={item.date}
                        contentId={item._id}
                        onDel={()=>deleteCard(item._id)}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
