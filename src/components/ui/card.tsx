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
}

const defaultCardStyles = "rounded-2xl mt-4 p-2";

export function Card(props:CardProps){
    console.log(props.tags)
    return<div className = {`${defaultCardStyles} bg-[#fffefe] h-[350px] w-[250px] p-3 mr-7 mb-2`}>
        <Header contentId = {props.contentId} startIcon = {props.startIcon} title = {props.title} shareIcon = {props.shareIcon} deleteIcon = {props.deleteIcon}/>
        <Content content = {props.text} link = {props.link} type = {props.type}/>
        <Tags tags = {props.tags} />
        <Footer date = {props.date}/>
    </div>
}