import React from 'react'
import './scroll.css'
import { Link } from 'react-scroll';

const scroll = () => {
    return (
        <div className="main__action">
            <Link
                to="formSection"
                spy={true}
                smooth={true}
                offset={0}
                duration={400}>
                <a className="main__scroll" href="#">
                    <div className="main__scroll-box">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M11.9997 13.1716L7.04996     8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill="rgba(28,28,30,1)">
                            </path>
                        </svg>
                    </div>

                    <span className="main__scroll-text">
                        Scroll
                    </span>
                </a>

            </Link>


        </div>
    )
}

export default scroll