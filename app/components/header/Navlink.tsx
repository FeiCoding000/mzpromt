import Link from "next/link";

export default function Navlink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="h-full flex items-center border-b-2 border-t-2 border-t-transparent border-b-transparent hover:border-b-brand"> 
            {children}
        </Link>
    )
}