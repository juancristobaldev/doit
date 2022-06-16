import React from "react";
import { AppContext } from "../../hooks/AppContext";
import { Form } from "../Form/Form";
import { FormControl } from "../FormControl/FormControl";

function ExercisesForm(){
    const {
        exercises,
        modal,
        setModal,
        addExerciseToList,
        selectExercise,
        createExercise,
        getDataForm
    } = React.useContext(AppContext)
    return(
        <div>
            {modal === "select" && 
            <React.Fragment>
                {exercises.length === 0 && "Crea tu primer ejercicio"}
                {exercises.length > 0 &&
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
                onClick={() => addExerciseToList()}
                >
                Agregar ejercicio
                </button>
            </React.Fragment>
            }
            {modal == "create" && 
                <React.Fragment>
                    <Form
                        onSubmit={(e) => createExercise(e)}
                    >
                        <FormControl
                        as={"input"}
                        name="name"
                        onChange={getDataForm}  
                        label={"Nombre del ejercicio:"}
                        />
                        <FormControl
                        as={"select"}
                        name="muscle"
                        label={"Musculo dominante:"}
                        onChange={getDataForm} 
                        >
                            <option>Espalda</option>
                            <option>Pierna</option>
                            <option>Abdomen</option>
                        </FormControl>
                        <FormControl
                        as={"select"} 
                        name="type"
                        label={"Tipo de ejercicio:"}
                        onChange={getDataForm}
                        >
                            <option>Peso asistido</option>
                            <option>Peso ponderado</option>
                            <option>Solo rep</option>
                        </FormControl>
                    </Form>
                </React.Fragment>
            }
        </div>
    )
}

export {ExercisesForm}