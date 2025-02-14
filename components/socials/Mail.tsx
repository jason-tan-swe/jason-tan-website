import { FaEnvelope } from "react-icons/fa"

export default function Mail(){
    return (
        <a 
        href="mailto:tjasonkyle@gmail.com" 
        className="text-neutral-400 hover:text-green-500 transition-colors"
        aria-label="Email"
        >
            <FaEnvelope className="w-6 h-6" />
        </a>
    )
}