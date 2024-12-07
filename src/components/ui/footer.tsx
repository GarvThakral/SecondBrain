interface FooterProps{
    date:string;
}
export function Footer(props:FooterProps){
    return<div className ={"text-[#a2a9ab]"}>
        Added on {props.date}
    </div>
}