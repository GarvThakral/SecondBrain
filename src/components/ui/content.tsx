interface ContentProps{
    type:string;
    content:String;
    link:string;
}
function hello(props:ContentProps){
    console.log(props.type)
    console.log(props.link.replace('/watch?v=', '/embed/'))
    if(props.type == "Video"){
        return <iframe  src={props.link.replace('youtu.be/', 'youtube.com/embed/').replace('/watch?v=', '/embed/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    }else if(props.type == "Tweet"){
        return <blockquote className="twitter-tweet ">
        <a href={props.link.replace("x","twitter")}></a>
      </blockquote>
    }else{
        return <a href = {props.link} className = {"text-purple-600 w-full break-words"}><div className = {"py-2"}>{props.link}</div></a>
    }
}
export function Content(props:ContentProps){
    return<div className = {"flex flex-col justify-between p-2"}>
        <div className = {"py-2"}>{props.content}</div>
        {hello(props)}
        
    </div>
}