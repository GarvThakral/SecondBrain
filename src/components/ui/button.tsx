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
    "sm":"py-1 px-2 md:w-28 sm:w-20",
    "md":"py-2 px-2 md:w-32 sm:w-32",
    "lg":"py-3 px-2 md:w-36 sm:w-36"
}


export function Button(props:ButtonProps){
    return<button onClick = {props.onClick} className = {`flex justify-center items-center ${variantStyles[props.variant]} ${sizeStyles[props.size]} rounded-xl mx-2`}>
        {props.startIcon}{props.text}{props.endIcon}
    </button>

}
