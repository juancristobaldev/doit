import React, { useContext } from "react";
import { AppContext } from "../../../hooks/AppContext";
import { OpenModalExercise } from "../../Buttons/OpenModalExercise";
import { SaveRoutine } from "../../Buttons/SaveRoutine";
import { Exercise } from "../../Exercise/Exercise";
import { List } from "../../List/List";
import { Main } from "../../Main/Main";
import { Section } from "../../Section/Section";
import { ExercisesForm } from "../../Exercise/ExerciseForm/ExerciseForm"
import { Modal } from "../../Modal/Modal";
import { Footer } from "../../Footer/Footer";
import { IoMdClose } from "react-icons/io"
import {BsThreeDots} from "react-icons/bs"
import { Error } from "../../Error/Error";


function AddRoutine(){
    const {listOnPlay,panelAdd,formRoutine,deleteSerie,changeVision,error} = useContext(AppContext)
    return(
        <Main className="addRoutine">
        <Section className="sectionTitle">
        <h4>Crear una rutina</h4>
        <IoMdClose
        onClick={() => changeVision('dashboard')}
        />
        </Section>
        <Section className="sectionInputTitle">
          <input placeholder="Nombre de la rutina" onChange={(e) => formRoutine(e,"title")}/>
        </Section>
        <List 
        style={listOnPlay == false ?
        {display:"flex",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        color:"white",
        }:{}}
        className="ListExercises"
        >
        {listOnPlay == false && <p style={{opacity:"50%"}}>Añade tu primer ejercicio <br/> 🏋🏻</p>}
        {listOnPlay.length > 0 && listOnPlay.map(
          exercise => 
          <Exercise
          exercise={exercise.name}
          objExercise={exercise}
          />
        )}
        </List>
        <Section className="sectionButtons">
            <OpenModalExercise/>
            <SaveRoutine/>
        </Section>
        <Footer/>
        {panelAdd && 
          <Modal>
            <ExercisesForm/>
          </Modal>
        }
        {error.error === true &&
        <Modal>
            <Error/>
        </Modal>
        }
      </Main>
    )
}

export {AddRoutine}