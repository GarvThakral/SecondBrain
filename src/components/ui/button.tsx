interface ButtonProps{
    variant: "primary" | "secondary";
    size: "sm"|"md"|"lg";
    text:String;
    startIcon?:any;
    endIcon?:any;
    onClick:()=>void;
}

const variantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
}
const sizeStyles = {
    "sm":"px-4 py-1 w-[150px]",
    "md":"px-6 py-2 w-[200px]",
    "lg":"px-8 py-3 w-[250px]"
}


export function Button(props:ButtonProps){
    return<button onClick = {props.onClick} className = {`flex justify-center items-center ${variantStyles[props.variant]} ${sizeStyles[props.size]} rounded-xl mx-2`}>
        {props.startIcon}{props.text}{props.endIcon}
    </button>

}
