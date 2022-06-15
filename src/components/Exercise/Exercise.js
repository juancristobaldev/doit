import React from "react";
import { AppContext } from "../../hooks/AppContext";

function Exercise({exercise,children}){
    const {AddSerie} = React.useContext(AppContext)
    return(
        <div className="itemExercise"
        key={exercise.name}
        >
          {exercise.map(item =>
          <div>
          <p>{item}</p>  
          <input type="number"/>
          </div>
          )}
          <button onClick={() => AddSerie(exercise)}>+</button>
        </div>
    )
}

export {Exercise}