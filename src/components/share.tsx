import Link from "next/link";
import { IconType } from "react-icons";
import { IoLogoFacebook, IoLogoLinkedin, IoLogoWhatsapp, IoLogoTwitter } from "react-icons/io5";
import CopyButton from "./copy";

interface IShare {
    Icon: IconType;
    Link: string;
}

const share: IShare[] = [
    { Icon: IoLogoFacebook, Link: "https://www.facebook.com/sharer/sharer.php?u=" },
    { Icon: IoLogoLinkedin, Link: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { Icon: IoLogoWhatsapp, Link: "https://wa.me/?text=" },
    { Icon: IoLogoTwitter, Link: "https://twitter.com/intent/tweet?url=" },
];

export default function ShareButton({ slug }: { slug: string }) {
    const domain = "https://blog-cms-seven-phi.vercel.app/blog/";

    return (
        <div className="p-4 md:p-6 text-xl md:text-2xl w-full">
            <p className="text-lg md:text-xl font-semibold">Share</p>
            <div className="flex flex-wrap gap-3 md:flex-row md:space-x-4 mt-2">
                {share.map((item, idx) => (
                    <Link href={`${item.Link}${domain}${slug}`} key={idx} target="_blank" rel="noopener noreferrer">
                        <item.Icon className="hover:text-blue-500 transition-colors duration-200" />
                    </Link>
                ))}
                <div>
                    <CopyButton Link={`${domain}${slug}`} />
                </div>
            </div>
        </div>
    );
}
