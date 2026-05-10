import Link from "next/link"
export default function Navbar() {
    return (
        <div className="w-auto h-full px-10 dark:text-white">
            <div className="items-center justify-between h-full gap-10 hidden md:flex">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/insights">Insights</Link>
                <Link href="/contact">Contact</Link>
            </div>
        </div>
    )
}