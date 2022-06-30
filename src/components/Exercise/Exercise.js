import React from "react";
import { AppContext } from "../../hooks/AppContext";
import "./Exercise.scss"
import {BsThreeDots} from "react-icons/bs"
import { IoMdClose } from "react-icons/io";
import { CheckBox } from "../Routines/Checkbox/CheckBox";
import {MdDeleteForever} from "react-icons/md"

function Exercise({objExercise,exercise,mode}){
    const {AddSerie,formRoutine,deleteSerie,deleteExerciseOfList} = React.useContext(AppContext)

    return(
        <div className="itemExercise"
        >
            <div className="exerciseData">
                <p>{objExercise.name}</p>
                <p>{objExercise.muscle}</p>
                <MdDeleteForever 
                style={{cursor:"pointer"}}
                height={"1.5em"}
                width={"1.5em"}
                onClick={() => deleteExerciseOfList(objExercise.name)}/>
              </div>
              <div className="back">
              <div className="exerciseGridName"
                   style={mode == "onPlay" ? 
                        {gridTemplateColumns: "20% 30% 20% 20% 10%"}
                        :
                        {gridTemplateColumns: "20% 50% 20% 10%"}
                              }
              >
                <p className="serieName">Serie</p>
                <p className="repsName">Reps</p>
              </div>
                  {objExercise["series"].map(item =>
                    <div className={item.completed == true ? "serie completed" : "serie" }  
                    style={mode == "onPlay" ? 
                        {gridTemplateColumns: "20% 30% 20% 20% 10%"}
                        :
                        {gridTemplateColumns: "20% 50% 20% 10%"}
                    }
                    >
                        <p className="nSerie">{item.id}</p>
                        <p className="nameSerie">{exercise}</p>
                        {item.reps > 0 ?
                            <input className="repsInput" 
                            name={item.id} 
                            value={item.reps}
                            onChange={(element) => formRoutine(element,item.id,exercise)} 
                            type={"number"}/>
                            :
                            <input className="repsInput" 
                            name={item.id} 
                            onChange={(element) => formRoutine(element,item.id,exercise)} 
                            type={"number"}/>
                        }
                        {mode == "onPlay" && 
                        <CheckBox 
                        serieID={item.id}
                        exerciseName={exercise}
                        completed={item.completed}
                        />}

                        <button className="deleteSerie" 
                        style={mode == "onPlay" ? 
                        {gridArea:"1 / 5 / 2 / 6"}
                        :
                        {gridArea:"1 / 4 / 2 / 5"}}

                        onClick={() => deleteSerie(exercise,item.id)}><IoMdClose/></button>
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