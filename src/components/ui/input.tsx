interface InputProps{
    ref?: React.Ref<HTMLInputElement>;
    variant:"primary"|"secondary";
    placeholder:string;
    size:"sm"|"md"|"lg";
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    
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



export function Input(props:InputProps){
    return <div className = {`flex ${sizeStyles[props.size]} rounded-2xl ${variantStyles[props.variant]}`}>
        <input ref = {props.ref} placeholder = {props.placeholder} onChange = {props.onChange} className = {`outline-none ${variantStyles[props.variant]}`}></input>
    </div>
}