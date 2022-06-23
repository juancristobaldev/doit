import React from "react";
import { AppContext } from "../../../hooks/AppContext";
import { Form } from "../../Form/Form";
import { FormControl } from "../../Form/FormControl/FormControl";
import { IoMdSearch } from "react-icons/io";
import { List } from "../../List/List";
import "./ExerciseForm.scss"
import { ListExercises } from "../../List/ListExercises";
import { TitleMenu } from "../../Routines/Title/TitleMenu";

function ExercisesForm(){
    const {
        UserDB,
        modal,
        setModal,
        createExercise,
        addExerciseToList,
        selectOnList,
        getDataForm,
        panelAdd,setPanelAdd
    } = React.useContext(AppContext)
    return(
        <div className="background">
            <div 
            style={modal === 'select' ? 
                {
                    gridTemplate:"7.5vh 6vh 1fr 15vh / 100%"
                }
                : 
                {
                    gridTemplate:null,
                    height:"auto",
                    margin:"25vh 10%"
                }
            }
            className="modalMenu">
            {modal === "select" && 
            <React.Fragment>
                <TitleMenu
                className="titleMenu"
                text="Lista de ejercicios"
                />
                <div className="divInput">
                    <input placeholder="Buscar ejercicio..." type="text"/>
                    <IoMdSearch/>
                </div>
                {UserDB.exercises.length === 0 && <p className="emptyExercises">Crea tu primer ejercicio <br/> 🏋🏻</p>}
                {UserDB.exercises.length > 0 &&
                <ListExercises
                    className={"exercisesList"}
                />
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
                    className="formCreate"
                    onSubmit={(e) => createExercise(e)}
                    >                   
                        <TitleMenu
                        className="titleMenu"
                        text="Crear ejercicio"
                        />
                        <FormControl
                        as={"input"}
                        className="divControl"
                        name="name"
                        onChange={getDataForm}  
                        label={"Nombre del ejercicio:"}
                        />
                        <FormControl
                        as={"select"}
                        className="divControl"
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
                        className="divControl"
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