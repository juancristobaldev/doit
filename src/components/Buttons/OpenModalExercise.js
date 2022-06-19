import React, { useContext } from "react";
import { AppContext } from "../../hooks/AppContext";
import "./Buttons.scss"

function OpenModalExercise(){
    const {setPanelAdd,panelAdd} = useContext(AppContext)

    return(
        <button
            className="buttonListExercises"
            onClick={() => setPanelAdd(!panelAdd)}
            >Lista de ejercicios
        </button>
    )
}

export {OpenModalExercise}