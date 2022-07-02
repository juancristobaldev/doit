import React, { useContext } from "react";
import './RoutineItem.scss'
import { RiTimerFill } from 'react-icons/ri';
import { AiFillTrophy } from 'react-icons/ai'
import { AppContext } from "../../../hooks/AppContext";

function RoutineItem({name,nExercises,done,time,routine}){
    const {goRoutine} = useContext(AppContext)

    return(
        <div className="routineItem">
            <div className="nameExercise">
                <h3>{name}</h3>
            </div>
            <div className="stats">
                <div className="exercises">
                    <p>Ejercicios: {nExercises}</p>
                </div>
                <div className="done">
                    <AiFillTrophy/>
                    <p>{done}</p>
                </div>
                <div className="time">
                    <RiTimerFill/>
                    <p>{time}</p>
                </div>
            </div>
            <div className="divButton">
                <button onClick={() => goRoutine(routine)}>GO</button>
                <button onClick={() => goRoutine(routine)}>Eliminar</button>
            </div>
        </div>
    )
}

export {RoutineItem}