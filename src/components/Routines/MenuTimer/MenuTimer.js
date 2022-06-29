import React, { useContext, useState, useEffect } from "react";
import { Timer } from "./Timer";

import "./MenuTimer.scss"
import { AppContext } from "../../../hooks/AppContext";


function MenuTimer(){

    const {UserDB} = useContext(AppContext)
    const [open,setOpenTimer] = useState(false)
    const [timerSelect,setTimerSelect] = useState(
        {
            time:null,
            select:false
        }
    )

    const alterTimer = () => {
        if(open === true){
            setOpenTimer(false)
            setTimerSelect({
                time:null,
                select:false
            })
        }else{
            setOpenTimer(true)
        }
    }
    return(
        <div 
        className={`temporizador ${timerSelect.select === true && 'gridOn'}`}
        style={open === true ?
        {
        transition:"1s",
        transform:"translateY(0vh)",
        position:"absolute",
        height:"60vh",
        }
        :
        {   
            transform:"translateY(-54vh)",
            top:"0vh",
            height:"60vh",
        }
        }
        >
            <div className="titleCountdown">
                <h3>¡Es tiempo de descansar!</h3>
                <button
                onClick={() => alterTimer()}
                className="skipButton"
                >Omitir</button>
            </div>
            {
                timerSelect.select === false &&
                <div className="infoCountdown">
                El temporizador guarda los ultimos 3 temporizadores que tu has creado para que los puedas ocupar cuando tu quieras
                </div>
            }
            <div className={timerSelect.select ? 'sectionTimer' : 'listCountdowns'}>
                {timerSelect.select ? 
                    <Timer
                    time={timerSelect.time}
                    />    
                :
                UserDB.countdown.length > 0 ?
                UserDB.countdown.map(time => 
                    <div 
                    className="itemCountdown"
                    onClick={() => setTimerSelect({time:time,select:true})}
                    >
                        {time}
                    </div>
                )
                :
                <div className="unTimer">
                    <p>No hay temporizadores <br/> ⏱️ </p>
                </div>
                }  
            </div>
            <div className="createCountdown">
            {timerSelect.select ? 
                <button
                onClick={() => {
                    setTimerSelect({time:null,select:false})
                }}
                >Lista de temporizadores</button> 
                : 
                <button>Crear temporizador</button> 
            }
            </div>
            <div 
            className="activador"
            style={{placeSelf:"center"}}
            onClick={() => alterTimer()}
            >
            <p
                style={
                {
                    gridArea:"3 / 1 / 4 / 2",
                }
                }
                >{open ? 'Cerrar temporizador' : 'Abrir temporizador'}</p>
            </div>
        </div>
    )
}

export{MenuTimer}