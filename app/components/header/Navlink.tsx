import Link from "next/link";

export default function Navlink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="h-full flex items-center hover:border-b-2 hover:border-t-2 hover:border-b-red-100 hover:border-t-transparent dark:hover:border-b-red-600 dark:hover:border-t-transparent">
            {children}
        </Link>
    )
}