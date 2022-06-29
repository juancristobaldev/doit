import React, { useContext } from "react";
import { AppContext } from "../../../hooks/AppContext";

function FinishRoutine(){
    const {endRoutine} = useContext(AppContext)

    return(
        <button onClick={() => endRoutine()}>Finalizar rutina</button>
    )
}

export {FinishRoutine}