import React from "react";
import './AddSomething.scss'
import { AppContext } from "../../hooks/AppContext";
import { App } from "../../App";


function AddSomething({alter,className}){
    const {setVision} = React.useContext(AppContext)
    return(
        <div className={"addSomething " + className}>
            <h2>{alter == "addFolder" ? 'Tus carpetas' : 'Tus rutinas'  }</h2>
            <button onClick={(event) => setVision(alter,event)}>Nuevo</button>
        </div>
    )
}

export {AddSomething}