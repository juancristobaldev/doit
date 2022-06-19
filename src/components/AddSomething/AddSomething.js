import React from "react";
import './AddSomething.scss'
import { AppContext } from "../../hooks/AppContext";
import { App } from "../../App";


function AddSomething({alter,className}){
    const {changeVision} = React.useContext(AppContext)
    return(
        <div className={"addSomething " + className}>
            {alter === "addRoutine" &&
                <React.Fragment>
                    <div className="titleAddSomething">
                        <h2>Tus rutinas</h2>
                    </div>
                    <div className="functions">
                        <p>Filtrar rutinas</p>
                        <button
                        onClick={() => changeVision(alter)}
                        >
                        Nuevo</button>
                    </div>
                </React.Fragment>
            }
            {alter !== "addRoutine" && 
                <React.Fragment>
                    <h2>Tus carpetas</h2>
                    <button
                    onClick={() => changeVision(alter)}
                    >Nuevo</button>
                </React.Fragment>
            }
        </div>
    )
}

export {AddSomething}