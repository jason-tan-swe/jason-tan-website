import { FaLinkedin } from "react-icons/fa"
export default function LinkedIn(){
    return (
        <a 
            href="https://linkedin.com/in/jason-tan-software-engineer"
            className="text-neutral-400 hover:text-green-500 transition-colors"
            aria-label="LinkedIn"
            >
            <FaLinkedin className="w-6 h-6" />
        </a>
    )
}