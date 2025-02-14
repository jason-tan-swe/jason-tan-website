import { FaXTwitter } from "react-icons/fa6"

export default function Twitter(){
    return (
        <a 
            href="https://x.com/jasontandev" 
            className="text-neutral-400 hover:text-green-500 transition-colors"
            aria-label="Twitter"
            >
            <FaXTwitter className="w-6 h-6" />
        </a>
    )
}