interface TextAreaProps{
    variant: "primary" | "secondary";
    size: "sm"|"md"|"lg";
    onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void;
}

const variantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
}
const sizeStyles = {
    sm: "h-20 w-48 sm:h-24 sm:w-56 md:h-32 md:w-64 lg:h-40 lg:w-72", // Small with responsive scaling
    md: "h-40 w-96 sm:h-48 sm:w-[26rem] md:h-56 md:w-[30rem] lg:h-64 lg:w-[36rem]", // Medium with responsive scaling
    lg: "h-60 w-[37.5rem] sm:h-72 sm:w-[40rem] md:h-80 md:w-[45rem] lg:h-96 lg:w-[50rem]" // Large with responsive scaling
  };
  
  
export function TextArea(props:TextAreaProps){
    return<div>
        <textarea placeholder="Set Post Text" onChange ={props.onChange} className = {`${variantStyles[props.variant]} ${sizeStyles[props.size]} rounded-2xl p-2`}></textarea>
    </div>
}