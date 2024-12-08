
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
    sm: "px-4 py-1 w-36",  
    md: "px-6 py-2 w-56 md:w-64",   
    lg: "px-8 py-2 w-72 lg:w-80"    
};



export function SelectArea(props:SelectAreaProps){
    return<div className = {`flex justify-center items-center ${sizeStyles[props.size]} rounded-2xl ${variantStyles[props.variant]}`}>
        <select className = {`rounded-2xl outline-none ${variantStyles[props.variant]}`} onChange = {props.onChange}>
            {props.options.map((item,index)=>{
                return <option key ={index} selected = {index === 0}>{item}</option>
            })}
        </select>
    </div>
}