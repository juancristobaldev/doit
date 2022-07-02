import React, { useContext, useState, useEffect } from "react";
import { Timer } from "./Timer";

import "./MenuTimer.scss"
import { AppContext } from "../../../hooks/AppContext";


function MenuTimer(){

    const {UserDB,createTimer,getDataForm} = useContext(AppContext)
    const [open,setOpenTimer] = useState(false)
    const [timerSelect,setTimerSelect] = useState(
        {
            time:null,
            select:false
        }
    )
    const [menu,setMenu] = useState(false)
    const alterTimer = () => {
        if(open === true){
            setOpenTimer(false)
        }else{
            setOpenTimer(true)
        }
    }

    const skipTimer = () => {
            if(menu === true){
                setMenu(!menu)
            }
            setTimerSelect({
                time:null,
                select:false
            })
            setOpenTimer(false)
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
                onClick={() => skipTimer()}
                className="skipButton"
                >Omitir</button>
            </div>
            {menu ? 
            <div className="timer">
                <div className="minutes-timer timer-count">
                    <span>Minutos</span>
                    <input 
                    maxLength={2}
                    name="min"
                    onChange={event => getDataForm(event,'min')}
                    type={"number"}
                    />
                </div>
                <div className="separator-timer timer-count">
                    <p>:</p>
                </div>
                <div className="seconds-timer timer-count">
                    <span>Segundos</span>
                    <input
                    maxLength={2}
                    max={60}
                    name="seg"
                    onChange={event => {
                        getDataForm(event,'seg')
                    }}
                    type={"number"}
                    />
                </div>
                <div className="button-timer">
                    <button onClick={() => {
                        createTimer()
                        setMenu(false)
                        setTimerSelect({time:null,select:false})
                    }}>
                        Agregar temporizador
                    </button>
                </div>
            </div>
            :
            <React.Fragment>
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
                <div className="unTimer"
                style={{
                    gridArea:'2 / 1 / 3 / 2'
                }}>
                    <p>No hay temporizadores <br/> ⏱️ </p>
                </div>
                }  
            </div>
            </React.Fragment>
            }
            <div className="createCountdown">
            {timerSelect.select ? 
                <button
                onClick={() => {
                    setTimerSelect({time:null,select:false})
                    setMenu(false)
                }}
                >Lista de temporizadores</button> 
                :
                menu === false &&
                <button 
                onClick={() => {
                    setMenu(!menu)
                    setTimerSelect({time:null,select:true})
                }}
                >Crear temporizador</button> 
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