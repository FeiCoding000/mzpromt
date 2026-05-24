"use client"
import Image from "next/image"
import Navbar from "./Navbar"
import Link from "next/link"
import Hamburger from "./Hamburger"

export default function Header () {
    return (
        <div className="relative z-50 w-full h-18 px-4 text-white bg-brand-dark">
            <div className="flex items-center justify-between h-full container">
                <Link className="block" href="/"><Image className="h-auto w-auto"height={63.2} width={110} src="/FullLogo_Transparent.png" alt="logo" loading="eager"/></Link>
                <Navbar />
                <Hamburger />
            </div>
        </div>
    )
}