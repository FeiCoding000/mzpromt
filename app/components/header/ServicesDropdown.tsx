"use client";
import Navlink from "./Navlink";
import Link from "next/link";

export default function ServicesDropdown() {

  const classNames = "block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600";
  return (
    <div className="relative group h-full flex items-center">
      <Navlink href="/services">
        Services
      </Navlink>
        <div className="absolute left-0 top-full w-48 bg-white text-black dark:bg-gray-800 dark:text-white shadow-lg hidden group-hover:block">
        <Link
          href="/services/tax"
          className={classNames}
        >
          Tax Services
        </Link>
        <Link
          href="/services/corporate"
          className={classNames}
        >
          Corporate Services
        </Link>
        <Link
          href="/services/bookkeeping"
          className={classNames}
        >
          Bookkeeping Services
        </Link>
        </div> 
    </div>
  );
}
