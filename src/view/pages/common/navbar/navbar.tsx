import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImage from "../../../../assets/footer-logo.png";
import {
    HiOutlineShoppingCart,
    HiOutlineUser,
    HiMenu,
    HiX,
} from "react-icons/hi";
import { getUserFromToken } from "../../../../auth/auth";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem("token"); // Make sure this matches wherever you set it
    const userData = token ? getUserFromToken(token) : null;

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo-container">
                    <img src={logoImage} alt="BookShop Logo" className="logo-img" />
                    <span className="logo-text">Sandesh Books</span>
                </Link>

                <div className={`menu ${isOpen ? "open" : ""}`}>
                    <Link to="/" className="menu-item">Home</Link>
                    <Link to="/about" className="menu-item">About</Link>
                    <Link to="/contact" className="menu-item">Contact</Link>
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="search-input"
                    />
                    <Link to="/books" className="browse-btn">Browse Books</Link>
                    <Link to="/cart" className="icon-link" aria-label="Cart">
                        <HiOutlineShoppingCart size={24} />
                    </Link>
                    {!token && (
                        <Link to="/login" className="icon-link" aria-label="Profile">
                            <HiOutlineUser size={24} />
                        </Link>
                    )}
                </div>

                {token && userData && (
                    <div className="user-info-modern">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="username-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <circle cx={12} cy={7} r={4} strokeLinecap="round" strokeLinejoin="round"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a6.5 6.5 0 0113 0"/>
                        </svg>
                        <span className="username-modern">{userData.username}</span>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/";
                            }}
                            className="logout-btn-modern"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="logout-icon"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2h-3a2 2 0 00-2 2v1"/>
                            </svg>
                            Logout
                        </button>
                    </div>
                )}

                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <HiX size={28}/> : <HiMenu size={28}/>}
                </button>
            </div>

            {isOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="mobile-menu-item" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/about" className="mobile-menu-item" onClick={() => setIsOpen(false)}>About</Link>
                    <Link to="/contact" className="mobile-menu-item" onClick={() => setIsOpen(false)}>Contact</Link>

                    <input
                        type="text"
                        placeholder="Search books..."
                        className="mobile-search-input"
                    />
                    <Link to="/books" className="mobile-browse-btn" onClick={() => setIsOpen(false)}>Browse Books</Link>

                    <div className="mobile-icons">
                        <Link to="/cart" className="icon-link" aria-label="Cart" onClick={() => setIsOpen(false)}>
                            <HiOutlineShoppingCart size={24} />
                        </Link>
                        {!token && (
                            <Link to="/login" className="icon-link" aria-label="Profile" onClick={() => setIsOpen(false)}>
                                <HiOutlineUser size={24} />
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
