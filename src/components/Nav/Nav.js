import React, { useContext } from "react";
import {GiHamburgerMenu} from "react-icons/gi"
import {AiOutlineRight} from "react-icons/ai"
import { AppContext } from "../../hooks/AppContext";
import './Nav.scss'
function Nav({children}){
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
                        cursor="pointer"
                        />
                </div>
                {children}
            </nav>
        )
}

export {Nav}