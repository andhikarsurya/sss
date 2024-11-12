import Link from "next/link"
export default function Navbar(){
    return(
        <div className="w-screen p-[1rem] h-[3rem] bg-orange-400 justify-center flex gap-[1rem] drop-shadow-xl  z-20">
           <Link href={"/"}>Home</Link>
        </div>
    )
}