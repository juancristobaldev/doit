import React, { useContext, useState, useEffect } from "react";
import { Timer } from "./Timer";

import "./MenuTimer.scss"


function MenuTimer(){

    const [open,setOpenTimer] = useState(false)
    const [timerSelect,setTimerSelect] = useState(
        {
            time:null,
            select:false
        }
    )
    const timer = ["01:30","02:30","00:10"]

    return(
        <div 
        className="temporizador"
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
                <button>Omitir</button>
            </div>
            <div className="infoCountdown">
                El temporizador guarda los ultimos 3 temporizadores que tu has creado para que los puedas ocupar cuando tu quieras
            </div>
            <div className={timerSelect.select ? '' : 'listCountdowns'}>
                {timerSelect.select ? 
                    <Timer
                    time={timerSelect.time}
                    />    
                :
                timer.length > 0 ?
                timer.map(time => 
                    <div 
                    className="itemCountdown"
                    onClick={() => setTimerSelect({time:time,select:true})}
                    >
                        {time}
                    </div>
                )
                :
                <div>
                    <p>No hay temporizadores</p>
                </div>
                }  
            </div>
            <div className="createCountdown">
                <button>Crear temporizador</button>
            </div>
            <div 
            className="activador"
            style={{placeSelf:"center"}}
            onClick={() => setOpenTimer(!open)}
            >
            <p
                style={
                {
                    gridArea:"3 / 1 / 4 / 2",
                }
                }
                >Temporizador</p>
            </div>
        </div>
    )
}

export{MenuTimer}