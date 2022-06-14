import React from "react";
import './RoutineItem.scss'
import { RiTimerFill } from 'react-icons/ri';
import { RiFlag2Fill } from 'react-icons/ri'
function RoutineItem({name,nExercises,done,time}){
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
                    <RiFlag2Fill/>
                    <p>{done}</p>
                </div>
                <div className="time">
                    <RiTimerFill/>
                    <p>{time}</p>
                </div>
            </div>
            <div className="divButton">
                <button>GO</button>
            </div>
        </div>
    )
}

export {RoutineItem}