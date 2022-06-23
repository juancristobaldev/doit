import React, { useContext } from "react";
import { AppContext } from "../../../hooks/AppContext";
import { IoMdClose } from "react-icons/io"

function TitleMenu({text,className}){
    const {setPanelAdd,panelAdd} = useContext(AppContext)
    return(
        <div className={className}>
            <h3>{text}</h3>
            <IoMdClose onClick={() => setPanelAdd(!panelAdd)}/>
        </div>
    )
}

export { TitleMenu }