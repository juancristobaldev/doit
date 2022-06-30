import React, { useEffect, useState, useRef } from "react";
import {FaPlay} from "react-icons/fa"
import {VscDebugRestart} from "react-icons/vsc"
import {CgMathMinus,CgMathPlus} from "react-icons/cg"
function Timer({time}){
    const convertTime = () => {
        const minutes = (parseInt(`${time[0]}${time[1]}`) * 60000)
        const seconds = (parseInt(`${time[3]}${time[4]}`) * 1000)
        const timeAsigned = minutes + seconds + 1000
        return {timeAsigned}
    }

    const {timeAsigned} = convertTime()
    const [timer,setTimer] = useState(time)
    const [timerState,setTimerState] = useState(false)

    const timeEnd = useRef(null)
    const idInterval = useRef(null)




    const getTimeRemaining = () => {
        const timeNow = new Date().getTime()
        const difference = timeEnd.current - timeNow

        const minutesTime = Math.floor((difference / 1000) / 60)
        const secondsTime = Math.floor((difference % 60000) / 1000)

        return {difference, minutesTime, secondsTime}
    }

    const alterTimer = () => {
            timeEnd.current = (new Date().getTime() + timeAsigned)
            setTimerState(true)

    }

    const addSeconds = () => {
        timeEnd.current = timeEnd.current + 10000
        setTimerState(true)
    }
    const deleteSecond = () => {
        const {difference} = getTimeRemaining()
        if(difference < 10000){
            timeEnd.current = timeEnd.current - 10000
            setTimer('00:00')
        }else{
            timeEnd.current = timeEnd.current - 10000
        }
        setTimerState(true)
    }

    const countdown = () => {
        
        const {minutesTime,secondsTime} = getTimeRemaining()
        
        if(timerState === true){
            if(minutesTime >= 0 || secondsTime >= 0){
                setTimer(`${minutesTime <= 9 ? `0${minutesTime}` : minutesTime }:${secondsTime <= 9 ? `0${secondsTime}` : secondsTime}`)
            }
            else{
                setTimerState(false)
            }
        }

    }
  
    useEffect(() => {
        if(timerState === true){
            idInterval.current = setInterval(() => {
                if(timerState === true){
                    countdown()
                }
            },1000)
        }
    })
    return (
        <div className="timer">
            <div className="minutes-timer timer-count">
                <span className="name-timer-count">Minutos</span>
                <h2>{timer[0]}{timer[1]}</h2>
            </div>
            <div className="timer-count separator">
                <p>:</p>
            </div>
            <div className="seconds-timer timer-count">
                <span className="name-timer-count">Segundos</span>
                <h2>{timer[3]}{timer[4]}</h2>
            </div>
            <div className="timer-buttons">
            {timerState === true && 
                <button 
                className="buttonDelete" 
                onClick={() => deleteSecond()}
                ><CgMathMinus/></button>
            }
                <button 
                className="buttonAlter" 
                onClick={() => alterTimer()}
                >{timerState ? <VscDebugRestart/> : <FaPlay/>}</button>
            {timerState === true &&
                <button 
                className="buttonAdd" 
                onClick={() => addSeconds()}
                ><CgMathPlus/></button>
            }
            </div>
        </div>
    )
}

export { Timer }