import React from "react";
import { AppContext } from "../../hooks/AppContext";
import "./Exercise.scss"

function Exercise({children,exercise}){
    const {AddSerie} = React.useContext(AppContext)
    return(
        <div className="itemExercise"
        key={exercise}
        >
            {children}
            <div className="divAddSerie">
                <button onClick={() => AddSerie(exercise)}>+ Agregar serie</button>
            </div>
        </div>
    )
}

export {Exercise}