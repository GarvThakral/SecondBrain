interface Tag {
    _id: string;
    title: string;    
    __v: number;      
}

interface TagProps{
    tags?:Tag[];
}

export function Tags(props:TagProps){
    return<div className = {'flex flex-wrap'}>
        {props.tags?.map((item)=>{
            return <div key ={item._id} className ={"text-sm text-purple-500 bg-purple-300 pb-2 pt-1 px-2 rounded-2xl flex items-center my-2 mr-2"}>#{item.title}</div>
        })}
        {/* <div className ={"text-sm text-purple-500 bg-purple-300 pb-2 pt-1 px-2 rounded-2xl flex items-center my-2"}>#productivity</div> */}
    </div>
}