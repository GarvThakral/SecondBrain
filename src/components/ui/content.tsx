interface ContentProps{
    type:string;
    content:String;
    link:string;
}
export function Content(props:ContentProps){
    return<div className = {"flex flex-col justify-between"}>
        <div className = {"py-2"}>{props.content}</div>
        <a href = {props.link} className = {"text-purple-600 w-full break-words"}><div className = {"py-2"}>{props.link}</div></a>
    </div>
}