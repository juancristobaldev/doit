import React from "react";
import { AppContext } from "../../hooks/AppContext";
import { Form } from "../Form/Form";
import { FormControl } from "../FormControl/FormControl";

function ExercisesForm(){
    const {
        UserDB,
        modal,
        setModal,
        listExercises,
        createExercise,
        addExerciseToList,
        selectOnList,
        getDataForm,
    } = React.useContext(AppContext)
    return(
        <div>
            {modal === "select" && 
            <React.Fragment>
                {UserDB.exercises.length === 0 && "Crea tu primer ejercicio"}
                {UserDB.exercises.length > 0 &&
                    listExercises.map(exercise => 
                        <div
                            style={
                                exercise.select ? 
                                {background:"black",color:"white"} : {background:"white",color:"black"}
                            }
                            onClick={() => selectOnList(exercise.name)}
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
                Agregar a la rutina
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