import { Link } from "react-router-dom"
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
const API_URL = "http://localhost:3000/api/v1"

export function AppMain() {
    const [addContent,setAddContent] = useState(false);

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

    const { content = [] } = useFetch(`${API_URL}/content`);

    const [contentState, setContentState] = useState<Content[]>([]);

    useEffect(() => {
        setContentState(content);
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
            setContentState(prevContent => prevContent.filter((item) => item._id !== cardId));
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
                {addContent ? <AddContent/> : null}
                {contentState?.map((item) => (
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
                ))}
            </div>
        </div>
    );
}
