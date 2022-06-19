import React from "react";
import {GiHamburgerMenu} from "react-icons/gi"
import './Nav.scss'
function Nav(){
    return(
            <nav className="Nav">
                <div>
                    <div
                     className="photo"
                     style={{
                        width:"30px",
                        height:"30px"
                    }}>
                    </div>
                </div>
                <div>
                    <GiHamburgerMenu
                    fill="silver"
                    />
                </div>
            </nav>
        )
}

export {Nav}