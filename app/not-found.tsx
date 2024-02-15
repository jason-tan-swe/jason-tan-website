"use client";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="h-content max-h-content p-4 flex flex-col items-center justify-center ">
            <h1 className="text-center text-xl">
                Oops! The place you&apos;re trying to find doesn&apos;t exist!
            </h1>
            <Link
                className="rounded-full px-4 py-2 mt-4 bg-emerald-500 font-bold text-white shadow-neon hover:opacity-60"
                href="/"
            >
                Return Home
            </Link>
        </main>
    );
}
