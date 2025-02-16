import { Source_Code_Pro, Roboto_Mono, Quicksand } from "next/font/google";

export const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto-mono",
});

export const sourceCodePro = Source_Code_Pro({
    subsets: ["cyrillic"],
    display: "swap",
    variable: "--font-source-code-pro",
});

export const quicksand = Quicksand({
    subsets: ['latin'],
    display: 'auto',
    variable: '--font-quicksand',
});
