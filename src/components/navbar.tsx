import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect } from "react";
import Consts from "../lib/consts";
import navbarStyles from "./navbar.module.scss";

export default function Navbar() {
    useEffect(() => {
        let toggle: HTMLElement = document.querySelector("#navbar-toggle")
        let collapse = document.querySelector("#navbar-items")
        toggle.onclick = () => {
            collapse.classList.toggle("hidden")
            collapse.classList.toggle("flex")
        }
    }, [])

    return (
        <nav className="mx-auto max-w-5xl md:flex px-5 py-3 md:py-4">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <a className="hover:no-underline">
                        <h1 className="font-bold text-xl dynamic-text-gray-600 flex items-center m-0 gap-3">
                            <img
                                src="/images/profile.jpg"
                                width={32}
                                height={32}
                                alt="Profile image"
                                className="rounded-full" />
                            {Consts.SITE_TITLE}
                        </h1>
                    </a>
                </Link>
                <button id="navbar-toggle" className="border border-solid border-gray-600 px-3 py-2 rounded dynamic-text-gray-600 opacity-50 hover:opacity-75 md:hidden">
                    <FontAwesomeIcon className="fill-current h-3 w-3" icon={faBars} />
                </button>
            </div>
            <NavBarItems />
        </nav>
    )
}

function NavBarItems() {
    return (
        <div id="navbar-items" className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0">
            {Consts.CONTENT_SECTIONS.map((item) => (
                <Link href={item.href} key={item.title}>
                    <a className={`${navbarStyles.navBarLinkColor} px-4 py-2 md:mx-2 rounded transition-colors duration-300`}>
                        {item.title}
                    </a>
                </Link>
            ))}
        </div>
    )
}
