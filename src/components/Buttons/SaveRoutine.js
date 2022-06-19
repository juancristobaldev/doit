import React, { useContext } from "react";
import { AppContext } from "../../hooks/AppContext";
import "./Buttons.scss"
function SaveRoutine(){
    const {AddRoutine} = useContext(AppContext)
    return(
            <button 
            className="buttonSaveRoutine"
            onClick={() => AddRoutine()}>Guardar rutina</button>
    )
}

export { SaveRoutine }