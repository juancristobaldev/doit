import React from "react";
import { AppContext } from "../../hooks/AppContext";
import { Form } from "../Form/Form";
import { FormControl } from "../FormControl/FormControl";
import { IoMdClose } from "react-icons/io"
import { IoMdSearch } from "react-icons/io";
import { List } from "../List/List";
import "./ExerciseForm.scss"

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
        panelAdd,setPanelAdd
    } = React.useContext(AppContext)
    return(
        <div className="background">
            <div className="modalMenu">
            {modal === "select" && 
            <React.Fragment>
                <div className="titleMenu">
                    <h3>Lista de ejercicios</h3>
                    <IoMdClose onClick={() => setPanelAdd(!panelAdd)}/>
                </div>
                <div className="divInput">
                    <input placeholder="Buscar ejercicio..." type="text"/>
                    <IoMdSearch/>
                </div>
                {UserDB.exercises.length === 0 && <p className="emptyExercises">Crea tu primer ejercicio <br/> 🏋🏻</p>}
                {UserDB.exercises.length > 0 &&
                <List className="exercisesList">
                {
                    listExercises.map(exercise => 
                        <div 
                            className="itemExerciseSelect"
                            style={
                                exercise.select ? 
                                {
                                    border:"1px solid black",
                                    borderRadius:"0.5rem"
                                } : {
                                    border:"1px solid transparent"
                                }
                            }
                            onClick={() => selectOnList(exercise.name)}
                            key={exercise.name}
                            >
                            <p>{exercise.name}</p>
                            <div 
                            style={ exercise.select ? 
                            {
                                background:"black"
                            }:{}}
                            className="circle"></div>
                        </div>            
                    )
                }                       
                </List>
                }
                <div className="divButtons">
                    <button 
                    className="buttonCreate"
                    onClick={() => setModal("create")}
                    >
                    Crear ejercicio
                    </button>

                    <button
                    className="buttonAdd"
                    onClick={() => addExerciseToList()}
                    >
                    Agregar a la rutina
                    </button>
                </div>
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
        </div>
    )
}

export {ExercisesForm}