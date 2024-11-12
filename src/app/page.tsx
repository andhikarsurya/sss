import { getBlogs } from "./libs/blog";
import { IBlog } from "@/types/blog";
import Wrapper from "@/components/wrapper";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const data: IBlog[] = await getBlogs();
  return (
    <div >
      {data.map((item) => {
        return (
          <div key={item.fields.slug}>
            <Wrapper>
              <Link href={`/blog/${item.fields.slug}`} className="text-blue-400 font-mono hover:scale-[110%] duration-200 ">
                <div className="bg-slate-200 flex justify-center items-center p-[1rem] border-2 border-black shadow-xl gap-[1rem] max-w-[30rem] ">
                  <div>
                    <Image
                      src={`https://${item.fields.thumbnail.fields.file.url}`}
                      alt={item.fields.title}
                      width={200}
                      height={200}
                      className="max-w-[20rem] max-h-[14rem]"
                    />
                  </div>
                  <div id="kanan">
                    <div>
                      <Image
                        src={`https://${item.fields.author.fields.avatar.fields.file.url}`}
                        alt={""}
                        width={200}
                        height={200}
                        className="w-[3rem] rounded-full"
                      />
                    </div>
                    <div className="text-green-400">{item.fields.author.fields.name}</div>
                    <div>
                      {item.fields.title.length > 40 ? `${item.fields.title.slice(0, 40)}...` : item.fields.title}
                    </div>
                  </div>
                </div>
              </Link>
            </Wrapper>
          </div>
        );
      })}
    </div>
  );
}
