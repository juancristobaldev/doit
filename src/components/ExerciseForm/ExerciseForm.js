import React from "react";
import { AppContext } from "../../hooks/AppContext";

function ExercisesForm(){
    const {
        modal,exercises,setModal,addExercise,selectExercise
    } = React.useContext(AppContext)

    return(
        <div>
            {modal === "select" && 
            <React.Fragment>
                { exercises.length > 0 &&
                    exercises.map(exercise => 
                        <div
                            style={exercise.select ? {background:"black",color:"white"} : {background:"white",color:"black"}}
                            onClick={() => selectExercise(exercise.name)}
                            key={exercise.name}
                            >{exercise.name}
                        </div>
                            
                    )
                }
                <button 
                onClick={() => setModal("create")}
                >
                Crear ejercicio
                </button>

                <button 
                onClick={() => addExercise()}
                >
                Agregar ejercicio
                </button>
            </React.Fragment>
            }
            {modal == "create" && 
                <React.Fragment>
                    <input 
                    placeholder="Nombre del ejercicio"
                    type={"text"}/>
                    <p>Musculo dominante:</p>
                    <select name="muscle">
                        <option>Espalda</option>
                        <option>Pierna</option>
                        <option>Abdomen</option>
                    </select>
                    <p>Tipo de ejercicio:</p>
                    <select name="muscle">
                        <option>Peso asistido</option>
                        <option>Peso ponderado</option>
                        <option>Solo rep</option>
                    </select>
                    <button >Crear ejercicio</button>
                </React.Fragment>
            }
        </div>
    )
}

export {ExercisesForm}