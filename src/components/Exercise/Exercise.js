import React from "react";
import { AppContext } from "../../hooks/AppContext";

function Exercise({children,exercise}){
    const {AddSerie} = React.useContext(AppContext)
    return(
        <div className="itemExercise"
        key={exercise}
        >
            {children}
            <button onClick={() => AddSerie(exercise)}>+</button>
        </div>
    )
}

export {Exercise}