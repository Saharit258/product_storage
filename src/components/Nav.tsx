import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="flex items-center justify-between">
                <div className="text-white text-2xl font-bold">ReactTailwind</div>

                {/* Toggle Menu Button */}
                <div className="md:hidden">
                    <button id="menu-toggle" className="text-white" onClick={toggleMenu}>
                        <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <ul className="hidden md:flex space-x-4">
                    <li>
                        <Link to="/" className="text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/calculate" className="text-white">
                            Calculate
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" className="text-white">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-white">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen ? (
                <ul className="flex-col md:hidden">
                    <li className="py-2">
                        <Link to="/" className="text-white" onClick={toggleMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="py-2">
                        <Link to="/calculate" className="text-white" onClick={toggleMenu}>
                            Calculate
                        </Link>
                    </li>
                    <li className="py-2">
                        <Link to="/services" className="text-white" onClick={toggleMenu}>
                            Services
                        </Link>
                    </li>
                    <li className="py-2">
                        <Link to="/contact" className="text-white" onClick={toggleMenu}>
                            Contact
                        </Link>
                    </li>
                </ul>
            ) : null}
        </nav>
    );
}

export default Nav;
