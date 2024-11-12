import { ReactNode } from "react"
export default function Wrapper({children}: {children:ReactNode}){
    return(
        <div className="flex flex-col justify-center items-center mt-[1rem] gap-[1rem]">
           {children}
        </div>
    )
}