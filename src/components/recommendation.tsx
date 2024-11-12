import { IBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export default function Recommend({blog}:{blog:IBlog[]}){
    return(
        <div className="justify-between flex flex-row"><p>Blog lainnya:</p>
            {blog.map((item)=>{
                return(
                    <div className="justify-between flex">
                        <div className="text-blue-700">
                        <Image
                      src={`https://${item.fields.thumbnail.fields.file.url}`}
                      alt={item.fields.title}
                      width={200}
                      height={200}
                      className="max-w-[9rem] max-h-[7rem] mx-auto"
                    />
                        <Link  href={`/blog/${item.fields.slug}`}>{item.fields.title}</Link>
                        
                    </div>
                    </div>
                    
                )
            })}
        </div>
    )
}