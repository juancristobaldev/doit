import React, { useEffect, useState, useRef } from "react";
function Timer({time}){

    const convertTime = () => {
        const minutes = (parseInt(`${time[0]}${time[1]}`) * 60000)
        const seconds = (parseInt(`${time[3]}${time[4]}`) * 1000)
        const timeAsigned = minutes + seconds + 1000
        return {timeAsigned}
    }

    const {timeAsigned} = convertTime()

    const [timer,setTimer] = useState(time)
    const timeEnd = useRef((new Date().getTime() + timeAsigned))
    const timerStatus = useRef(true)



    const getTimeRemaining = () => {
        const timeNow = new Date().getTime()
        const difference = timeEnd.current - timeNow

        const minutesTime = Math.floor((difference / 1000) / 60)
        const secondsTime = Math.floor((difference % 60000) / 1000)

        return {difference, minutesTime, secondsTime}
    }

    const countdown = () => {
        
        const {minutesTime,secondsTime} = getTimeRemaining()
        
        if(timerStatus){
            if(minutesTime >= 0 || secondsTime >= 0){
                console.log(1)
                setTimer(`${minutesTime <= 9 ? `0${minutesTime}` : minutesTime }:${secondsTime <= 9 ? `0${secondsTime}` : secondsTime}`)
            }
            else{
                timerStatus.current = false
            }
        }

    }
  
    useEffect(() => {
        if(timerStatus){
            setInterval(() => {
                countdown()
            },1000)
        }
    })
    return (
        <div className="App">
            <h2>{timer}</h2>
        </div>
    )
}

export { Timer }