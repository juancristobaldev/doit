import React, { useContext } from "react";
import { AppContext } from "../../hooks/AppContext";
import {BsThreeDots} from "react-icons/bs"
import { FinishRoutine } from "./FinishRoutine/FinishRoutine";
import { Section } from "../Section/Section";
import { OpenModalExercise } from "../Buttons/OpenModalExercise";
import { ExercisesForm } from "../Exercise/ExerciseForm/ExerciseForm";
import { Modal } from "../Modal/Modal";
import { Exercise } from "../Exercise/Exercise";
import { Main } from "../Main/Main";
import { TitleRoutine } from "./Title/TitleRoutine";
import {ProgressiveCount} from "./ProgressiveCount/ProgressiveCount"
import "./GoRoutine.scss"
import { MenuTimer } from "./MenuTimer/MenuTimer";
import { Footer } from "../Footer/Footer";
import { List } from "../List/List";
import { Error } from "../Error/Error";
import { Message } from "../Error/Message/Message";


function GoRoutine(){   
    const {routine,listOnPlay,panelAdd,error,message} = useContext(AppContext)
    return(
        <Main
        className="mainGoRoutine"
        >
            <MenuTimer/>
            <Section className="divRoutine">
                <TitleRoutine
                    className="titleRoutine"
                    nameRoutine={routine.name}
                />
                <FinishRoutine/>
            </Section>
            <Section className={"stats"}>
                <div>Tiempo record 🎉: {routine.timeRecord ? routine.timeRecord : '00:00:00'}</div>
                <ProgressiveCount/>
            </Section>
            <List className="ListOnPlay">
                {listOnPlay.map(exercise => 
                    <Exercise
                    exercise={exercise.name}
                    objExercise={exercise}
                    mode="onPlay"
                    />
                )}
            </List>
            <OpenModalExercise/>
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
            {message.message === true &&
                <Modal>
                    <Message/>
                </Modal>
            }
        </Main>
        
    )
}

export { GoRoutine }