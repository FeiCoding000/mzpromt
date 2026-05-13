import Navlink from "./Navlink"
import ServicesDropdown from "./ServicesDropdown"
export default function Navbar() {
    return (
        <div className="w-auto h-full px-10">
            <div className="items-center justify-between h-full gap-10 hidden md:flex">
                <Navlink href="/">Home</Navlink>
                <Navlink href="/about">About</Navlink>
                <ServicesDropdown />
                <Navlink href="/insights">Insights</Navlink>
                <Navlink href="/contact">Contact</Navlink>
            </div>
        </div>
    )
}