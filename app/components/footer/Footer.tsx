import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
export async function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-4 mt-8">
      <div className="container mx-auto text-center flex flex-col items-center space-y-4 w-full">
        <div className="mx-auto w-full flex flex-col md:flex-row items-center md:items-center justify-center space-y-4 md:space-x-12 md:space-y-0">
          <div>
            <Link href="/">
              <Image
                src="/FullLogo_Transparent.png"
                alt="MZPromt Logo"
                width={160}
                height={50}
              />
            </Link>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="block md:hidden w-full" />
          <div className="flex flex-col items-start md:flex-row space-y-6 md:space-x-12 md:space-y-0">
            <div className="text-left flex-col items-start md:space-x-0">
              <p className="">Services</p>
              <div className="flex flex-col space-y-1 mt-1 text-left">
                <Link href="/services/tax" className="text-sm hover:underline">
                  Tax Service
                </Link>
                <Link
                  href="/services/corporate"
                  className="text-sm hover:underline"
                >
                  Corporate Service
                </Link>
                <Link
                  href="/services/bookkeeping"
                  className="text-sm hover:underline"
                >
                  Bookkeeping Service
                </Link>
              </div>
            </div>
            <div>
              <p className="text-left">Contact</p>
              <div className="flex flex-col space-y-1 mt-1 text-left">
                <p className="text-sm">Email: info@mzpromt.com</p>
                <p className="text-sm">Phone: (123) 456-7890</p>
                <p className="text-sm">Address: 123 Main St, City, Country</p>
              </div>
            </div>
            <div>
              <p className="text-left">Follow Us</p>
              <div className="flex flex-row space-x-4 md:flex-col mt-1 text-left">
                <Link
                  href="https://www.facebook.com/mzpromt"
                  className="text-sm hover:underline"
                >
                  Facebook
                </Link>
                <Link
                  href="https://www.twitter.com/mzpromt"
                  className="text-sm hover:underline"
                >
                  Twitter
                </Link>
                <Link
                  href="https://www.linkedin.com/company/mzpromt"
                  className="text-sm hover:underline"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} MZPromt. All rights reserved.</p>
      </div>
    </footer>
  );
}
