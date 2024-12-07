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
    sm: "h-[80px] w-[200px]", 
    md: "h-[160px] w-[400px]", 
    lg: "h-[240px] w-[600px]"
  };
  
export function TextArea(props:TextAreaProps){
    return<div>
        <textarea placeholder="Set Post Text" onChange ={props.onChange} className = {`${variantStyles[props.variant]} ${sizeStyles[props.size]} rounded-2xl p-2`}></textarea>
    </div>
}