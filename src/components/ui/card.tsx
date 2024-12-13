import { Content } from "./content";
import { Footer } from "./footer";
import { Header } from "./header";
import { Tags } from "./tags";

interface Tag {
    _id: string;
    title: string;    
    __v: number;      
}

interface CardProps {
    type:string;
    title: string;
    link: string;
    text: string;
    startIcon: any;
    shareIcon: any;
    tags: Tag[];    
    image?: any;
    deleteIcon: any;
    date: string;
    contentId:string;
    onDel:()=>Promise<void>;
}

const defaultCardStyles = "rounded-2xl mt-4 p-2 ";

export function Card(props:CardProps){
    console.log(props.tags)
    return<div className = {`${defaultCardStyles} bg-[#fffefe] p-3 mr-7 mb-2 min-w-64 max-w-96 max-h-fit`}>
        <Header contentId = {props.contentId} startIcon = {props.startIcon} title = {props.title} shareIcon = {props.shareIcon} deleteIcon = {props.deleteIcon} onDel = {props.onDel} link = {props.link}/>
        <Content content = {props.text} link = {props.link} type = {props.type}/>
        <Tags tags = {props.tags} />
        <Footer date = {props.date}/>
    </div>
}