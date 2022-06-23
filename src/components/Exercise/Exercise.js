import React from "react";
import { AppContext } from "../../hooks/AppContext";
import "./Exercise.scss"
import {BsThreeDots} from "react-icons/bs"
import {IoMdClose} from "react-icons/io"

function Exercise({objExercise,exercise,mode}){
    const {AddSerie,formRoutine,deleteSerie} = React.useContext(AppContext)
    return(
        <div className="itemExercise"
        >
            <div className="exerciseData">
                <p>{objExercise.name}</p>
                <p>{objExercise.muscle}</p>
                <BsThreeDots/>
              </div>
              <div className="back">
              <div className="exerciseGridName">
                <p className="serieName">Serie</p>
                <p className="repsName">Reps</p>
              </div>
                  {objExercise["series"].map(item =>
                    <div className="serie">
                        <p className="nSerie">{item.id}</p>
                        <p className="nameSerie">{exercise}</p>
                        <input className="repsInput" 
                        name={item.id} 
                        value={item.reps}
                        onChange={(element) => formRoutine(element,item.id,exercise)
                        } 
                        type={"number"}/>
                        {mode == "onPlay" && <p>checkbox</p>}
                        <button className="deleteSerie" onClick={() => deleteSerie(exercise,item.id)}><IoMdClose/></button>
                    </div>
                  )}
              </div>
            <div className="divAddSerie">
                <button onClick={() => AddSerie(exercise)}>+ Agregar serie</button>
            </div>
        </div>
    )
}

export {Exercise}