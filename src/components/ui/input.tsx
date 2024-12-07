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
    sm: "px-4 py-1",
    md: "px-6 py-1",
    lg: "px-8 py-2"
};

export function Input(props:InputProps){
    return <div className = {`flex ${sizeStyles[props.size]} rounded-2xl ${variantStyles[props.variant]} m-2 w-[250px]`}>
        <input ref = {props.ref} placeholder = {props.placeholder} onChange = {props.onChange} className = {`outline-none ${variantStyles[props.variant]}`}></input>
    </div>
}