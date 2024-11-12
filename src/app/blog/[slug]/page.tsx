import { getBlogs, getBlogSlug,getBlogRecommend } from "../../libs/blog";
import { IBlog } from "@/types/blog";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS} from "@contentful/rich-text-types";
import { format } from 'date-fns';
import Image from "next/image";
import ShareButton from "@/components/share";
import Recommend from "@/components/recommendation";
export const generateStaticParams = async () => {
  const blogs:IBlog[] = await getBlogs()

  return blogs.map((item) => ({
      slug: item.fields.slug
  }))

}
export async function generateMetadata({ params}: { params:{slug:string}}){
  const blogs: IBlog = await getBlogSlug(params.slug)
  
  return{
      title: blogs.fields.title,
      description: blogs.fields.title,
      authors: blogs.fields.author.fields.name,
      openGraph: {
          images:[`https:${blogs.fields.thumbnail.fields.file.url}`]
      }
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const data: IBlog = await getBlogSlug(params.slug);
  const blogzz: IBlog[] = await getBlogRecommend(params.slug)
  console.log("Blog Content Structure:", JSON.stringify(data.fields.content, null, 2));
  const options : Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => <p className="my-paragraph">{children}</p>,
      [BLOCKS.HEADING_1]: (_node, children) => <h1 className="my-heading">{children}</h1>,
      [BLOCKS.HEADING_2]: (_node, children) => <h2 className="my-heading">{children}</h2>,
      [BLOCKS.HEADING_3]: (_node, children) => <h3 className="my-heading">{children}</h3>,
    },
  };

  return (
    <div>
    <div className="bg-white border-2 border-black m-[1rem] shadow-xl rounded-3xl">
       <div className="justify-end w-full items-end flex">
        <div><ShareButton slug={data.fields.slug} /></div>
          
      </div>
      <div className="flex justify-center items-end gap-[1rem] mt-[1rem]">
      
              <Image
                src={`https://${data.fields.author.fields.avatar.fields.file.url}`}
                alt={""} 
                width={600}
                height={600}
                className="w-[3rem] rounded-full"  
              />
      <p className="font-bold">Author: {data.fields.author.fields.name}</p>
      <p>{format(new Date(data.fields.date), 'MMMM dd, yyyy')}</p>
     
      </div>
    <div className="flex flex-col justify-center items-center">
      
      <h1 className="font-bold text-[2rem] text-center my-[1rem]">{data.fields.title}</h1>
      <Image
        src={`https://${data.fields.thumbnail.fields.file.url}`}
        alt={data.fields.title}
        width={600}
        height={300}
        className=" w-[20rem]"
      />
      
      <div className="content mt-[1rem] ml-[1rem] mr-[9rem]">
        {documentToReactComponents(data.fields.content, options)}
      </div>
      
    </div>
    
    </div>
    <div className="bg-white border-2 border-black m-[1rem] shadow-xl rounded-3xl p-[2rem] flex flex-col justify-between items-center mt-[1rem] gap-[3rem]"><Recommend blog={blogzz}></Recommend></div>
    </div>
  );
}