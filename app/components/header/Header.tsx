"use client"
import Image from "next/image"
import Navbar from "./Navbar"
import Link from "next/link"
import { Menu } from "lucide-react"
import Hambergur from "./Hambergur"
import { useState } from "react"
export default function Header () {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div className="relative z-50 w-full h-18 px-4 text-white bg-brand-dark">
            <div className="flex items-center justify-between h-full container">
                <Link href="/"><Image className="h-auto w-auto"height={63.2} width={110} src="/FullLogo_Transparent.png" alt="logo" loading="eager"/></Link>
                <Navbar />
                <div className="hover:bg-gray-200 md:hidden cursor-pointer dark:hover:bg-gray-600 p-2 rounded" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu />
                </div>
                {isMenuOpen && <Hambergur />}
            </div>
        </div>
    )
}