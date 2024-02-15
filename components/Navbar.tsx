"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sourceCodePro } from "@/app/fonts";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const drawerItemStyles = "px-4 py-3 text-center font-bold";
    const navItemStyles = "h-full px-4 flex items-center";
    const linkItemStyles = "h-full text-center flex items-center";
    return (
        <>
            <nav className="overflow-hidden hidden font-bold sm:flex sticky w-full z-10 bg-neutral-50 shadow-xl top-0 left-0 px-4 h-14 justify-between items-center">
                <Link href="/" className={`${sourceCodePro.className}`}>
                    jason.tan
                </Link>
                <ul role="menu" aria-label="menu" className="h-full flex gap-8">
                    <li role="menuitem" className={navItemStyles}>
                        <Link className={linkItemStyles} href="/about">
                            About
                        </Link>
                    </li>
                    <li role="menuitem" className={navItemStyles}>
                        <Link className={linkItemStyles} href="/contact">
                            Contact
                        </Link>
                    </li>
                    <li role="menuitem" className={navItemStyles}>
                        <Link className={linkItemStyles} href="/experience">
                            Experience
                        </Link>
                    </li>
                    <li role="menuitem" className={navItemStyles}>
                        <Link className={linkItemStyles} href="/resume">
                            Resume
                        </Link>
                    </li>
                </ul>
            </nav>
            <nav className="overflow-hidden flex justify-between sticky z-10 w-full top-0 shadow-md bg-neutral-50 left-0 p-4 sm:hidden">
                <Link
                    href="/"
                    className={`font-bold ${sourceCodePro.className}`}
                >
                    jason.tan
                </Link>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FontAwesomeIcon width={"32"} height={"32"} icon={faBars} />
                </button>
            </nav>
            <Drawer
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(!isMenuOpen)}
                direction="top"
                style={{ flex: 1, height: "fit-content" }}
                className="flex flex-col "
            >
                <Link className={drawerItemStyles} href="/about">
                    About
                </Link>
                <Link className={drawerItemStyles} href="/contact">
                    Contact
                </Link>
                <Link className={drawerItemStyles} href="/experience">
                    Experience
                </Link>
                <Link className={drawerItemStyles} href="/resume">
                    Resume
                </Link>
            </Drawer>
        </>
    );
}
