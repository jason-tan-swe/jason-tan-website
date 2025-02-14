import { FaGithub } from "react-icons/fa"

export default function GitHub(){
    return (
        <a 
            href="https://github.com/jason-tan-swe" 
            className="text-neutral-400 hover:text-green-500 transition-colors"
            aria-label="GitHub"
        >
            <FaGithub className="w-6 h-6" />
        </a>
    )
}