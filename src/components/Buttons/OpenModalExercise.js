import React, { useContext } from "react";
import { AppContext } from "../../hooks/AppContext";

function OpenModalExercise(){
    const {setPanelAdd,panelAdd} = useContext(AppContext)

    return(
        <div> 
            <button
            onClick={() => setPanelAdd(!panelAdd)}
            >Lista de ejercicios</button>
        </div>
    )
}

export {OpenModalExercise}