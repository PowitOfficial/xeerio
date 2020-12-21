import "../static/components/navBar.css";
import Link from "./link";
import React, { useState } from 'react'

const NavBar = props => {
    const [active, changeActive] = useState(false)

    const toggleClass = () => {
        changeActive(!active)
    }

    return (
        <div className="nav">
            <div className="navWrapper">
                <div className={props.loading ? "loader loading" : "loader"} />
                <Link href="/">
                    <a id="logo">
                        <img src="../static/images/logo.svg" alt="xeerio logo" />
                        <p>Xeerio</p>
                    </a>
                </Link>
                <div id="nav-icon" className={active ? "open" : ""} onClick={toggleClass}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={active ? "open overlay" : "overlay"}>
                    <div className="overlayContent">
                        <Link activeClassName="active" href="/"><a className={active ? "open" : ""}>Home</a></Link>
                        <Link activeClassName="active" href="/about"><a className={active ? "open" : ""}>About</a></Link>
                        <Link activeClassName="active" href="/contact"><a className={active ? "open" : ""}>Contact</a></Link>
                    </div>
                </div>
                <div className="right">
                    <Link href="/" activeClassName="active">
                        <a id="home">Home</a>
                    </Link>
                    <Link href="/about" activeClassName="active">
                        <a id="about">About</a>
                    </Link>
                    <Link href="/contact" activeClassName="active">
                        <a id="contact">Contact</a>
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default NavBar;
