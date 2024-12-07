import { ChangeEventHandler } from "react";

interface SelectAreaProps{
    size:"sm"|"md"|"lg";
    variant:"primary"|"secondary";
    options:Array<string>;
    onChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
}

const variantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
}

const sizeStyles = {
    sm: "px-4 py-1", 
    md: "px-6 py-1",
    lg: "px-8 py-2"
};


export function SelectArea(props:SelectAreaProps){
    return<div className = {`flex justify-center items-center ${sizeStyles[props.size]} rounded-2xl ${variantStyles[props.variant]} m-2 w-[250px]`}>
        <select className = {`rounded-2xl outline-none ${variantStyles[props.variant]}`} onChange = {props.onChange}>
            {props.options.map((item,index)=>{
                return <option key ={index} selected = {index === 0}>{item}</option>
            })}
        </select>
    </div>
}