import React, { useContext } from "react";
import { AppContext } from "../../../hooks/AppContext";
import '../Error.scss'
import {GiPartyPopper} from "react-icons/gi"
function Message(){
    const {message,setMessage,success} = useContext(AppContext)
    return(
        <div className="background">
            <div className="Error">
                <div className="iconError success"><GiPartyPopper/></div>
                <div className="typeError">{message.typeMessage}</div>
                <div className="buttonError">
                    <button onClick={() => success()}>Continuar</button>
                </div>
            </div>
        </div>
    )
}

export {Message}