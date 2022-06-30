import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AppContext = React.createContext()

function AppProvider({children}){
    const {itemLocalStorage,saveItemLocalStorage} = useLocalStorage('UserDB',{
        name:'Juan Cristobal',
        routines:[],
        folders:[],
        exercises:[],
        countdown:[],
        ends:0
    })
    const UserDB = itemLocalStorage
    const AlterUserDB = saveItemLocalStorage

    const [error,setError] = useState({error:false,type:'next',typeError:null})
    const [message,setMessage] = useState({message:false,typeMessage:null})

    const [vision,setVision] = useState('dashboard')
    const [counter,setCounter] = useState(0)
    const [panelAdd,setPanelAdd] = useState(false)
    const [listExercises,setListExercises] = useState([...UserDB.exercises])
    const [listOnPlay,setListOnPlay] = useState([])
    const [dataForm,setDataForm] = useState({})
    const [formCreate,setFormCreate] = useState(
        {
            name:null,
            muscle:null,
            type:null
        }
    )
    const [modal, setModal] = useState('select')
    const [routine,setRoutine] = useState(
        {
            name:null,
            key:null,
            timeRecord:null,
            endpoints:null,
            exercises:[],
            active:null
        }
    )

    const [timeRoutine, setTimeRoutine] = useState({
        hour:null,
        min:null,
        seg:null
    })
    const [routineOnPlay,setRoutineOnPlay] = useState(null)
    //Change Modal
    
    function changeVision(vision){
        if(vision === "dashboard"){
            setPanelAdd(!panelAdd)
            setVision(vision)
            setListOnPlay([])
        }else if(vision === "addRoutine"){
            setVision(vision)
            setPanelAdd(false)
        }
    }

    // Forms

    function getDataForm(event,name){
        const data = {...dataForm}
        data[name] = event.target.value
        setDataForm(data)
    }
    // Crud Exercises
    function createExercise(event){
        event.preventDefault()
        const data = {...dataForm}
        const DB = UserDB
        const index = DB.exercises.findIndex(item => item.name === data["name"])
        if(index >= 0){
            setError({error:true,typeError:"Ya existe un ejercicio con el mismo nombre"})
        }else{
            if(data["name"] && data["type"] && data["muscle"]){
                data["series"] = []
                data["select"] = false
                const newDataUser = {...UserDB}
                newDataUser.exercises.push(data)
                setModal("select")
                AlterUserDB('UserDB',newDataUser)
                setListExercises([...UserDB.exercises])
            }else{
                setError({error:true,typeError:"Rellena todos los campos"})
            }
        }
    }

    function deleteExercise(name){
        const newListExercises = listExercises.filter(item => item.name !== name)
        const newUserDB = {...UserDB}
        newUserDB.exercises = newListExercises
        setListExercises(newUserDB.exercises)
        AlterUserDB('UserDB',newUserDB)
    }

    function AddSerie(nameExercise){
        const newListExercises = [...listOnPlay],
        exercise = newListExercises.findIndex(item => item.name === nameExercise),
        id = newListExercises[exercise].series.length + 1;
        newListExercises[exercise]["series"].push({id:id,reps:0,completed:false})
        setListOnPlay(newListExercises)

    }

    function deleteSerie(nameExercise,nSerie){
        const newSeries = [...listOnPlay]
        const indexExercise = listOnPlay.findIndex(item => item.name === nameExercise)
        const series = newSeries[indexExercise]["series"]
        const indexSerie = series.findIndex(serie => serie.id === nSerie)
        series.splice(indexSerie,1)
        for(var i = 0; i < series.length; i++){
            series[i].id = i + 1
        }
        newSeries[indexExercise]["series"] = series
        setListOnPlay(newSeries)
        
    }

    function finishSerie(idSerie,nameExercise){
        const newListOnPlay = [...listOnPlay]
        const indexExercise = newListOnPlay.findIndex(item => item["name"] == nameExercise)
        const indexSerie = newListOnPlay[indexExercise]["series"].findIndex(item => item.id === idSerie)
        const serie = newListOnPlay[indexExercise]["series"][indexSerie]
        if(serie["completed"] === false){
            serie["completed"] = true
        }else{
            serie["completed"] = false
        }
        setListOnPlay(newListOnPlay)
    }

    // Crud Select of the List

    function selectOnList(nameExercise){
        const newListSelect = [...listExercises]
        newListSelect.forEach(exercise => {
            if(exercise.name === nameExercise){
                if(exercise["select"] === true){
                    exercise.select = false
                }else{
                    exercise.select = true
                }
            }else{
                exercise.select = false
            }
        })
        setListExercises(newListSelect)
    }
    function addExerciseToList(){
        const newListOnPlay = [...listOnPlay]
        const indexItemToAdd = listExercises.findIndex(exercise => exercise.select === true)
        if(indexItemToAdd >= 0){
            const indexOnPlay = newListOnPlay.findIndex(exercise => exercise.name === listExercises[indexItemToAdd].name)
            if(indexOnPlay < 0){
                newListOnPlay.push(listExercises[indexItemToAdd])
                setListOnPlay(newListOnPlay)
                setPanelAdd(!panelAdd)
                setModal("select")
            }else{
                setError({error:true,typeError:"No puedes repetir el ejercicio"})
            }
        }else{
            setError({error:true,typeError:"Debes seleccionar un ejercicio"})
        }
    }
    
    function deleteExerciseOfList(name){
        const newListOnPlay = listOnPlay.filter(item => item.name !== name)
        setListOnPlay(newListOnPlay)

    }

    //Routines

    function formRoutine(element,name,exerciseName){
        const Routine = {...routine}
        if(name === "title"){
            Routine["name"] = element.target.value
        }else{
            const indexExercise = Routine.exercises.findIndex(item => item.name === exerciseName)
            if(indexExercise < 0){
                Routine.exercises.push({name:exerciseName,serie:[{id:name,reps:element.target.value}]})
            }else{
                const serieIndex = Routine.exercises[indexExercise].serie.findIndex(id => id.id === name)
                if(serieIndex < 0){
                    Routine.exercises[indexExercise].serie.push({id:name,reps:element.target.value,completed:false})
                }else{
                    Routine.exercises[indexExercise].serie[serieIndex]["reps"] = element.target.value
                }
            }
        }
        setRoutine(Routine)
    }


    function AddRoutine(){
        const Routine = {...routine} 
        if(Routine.name !== null){
            if(Routine.exercises.length === listOnPlay.length){
                const newDB = {...UserDB}
                newDB.routines.push(Routine)
                AlterUserDB('UserDB',newDB)
                changeVision('dashboard')
            }else{
                setError({error:true,typeError:"No puedes dejar un ejercicio en blanco"})
            }
        }else{
            setError({error:true,typeError:"Debes asignar un nombre a la rutina"})
        }
        
    }

    function goRoutine(routine){
        const newListOnPlay = []
        routine["exercises"].forEach(exercise => {
            exercise.serie.forEach(serie => 
                serie["completed"] = false
            )
            const id = UserDB.exercises.findIndex(item => item.name === exercise.name)
            const newObject = {...UserDB.exercises[id]}
            newObject["series"] = exercise.serie
            newListOnPlay.push(newObject)
        })
        setError({error:false,typeError:null,type:null})
        setRoutine(routine)
        setListOnPlay(newListOnPlay)
        setVision("goRoutine")
    }

    function routineFinish(){
        setMessage(
            {
                message:true,
                typeMessage:`¡Bien hecho guerrero!`
            }
        )
        const changesRoutine = {...routine}
        // Nombre de rutina
        changesRoutine["name"] = routine.name
        // Sumar veces finalizada la rutina
        if(!changesRoutine["endpoints"]){
            changesRoutine["endpoints"] = 1
        } else{
            changesRoutine["endpoints"] = routine.endpoints + 1
        }
        // Decidir tiempo record.
        if(changesRoutine["timeRecord"]){
            const hourRecord = parseInt(`${changesRoutine.timeRecord[0]}${changesRoutine.timeRecord[1]}`)
            const minRecord = parseInt(`${changesRoutine.timeRecord[3]}${changesRoutine.timeRecord[4]}`)
            const segRecord = parseInt(`${changesRoutine.timeRecord[6]}${changesRoutine.timeRecord[7]}`)
            const hourRoutine = parseInt(timeRoutine.hour)
            if(hourRecord == hourRoutine){
                const minRoutine = parseInt(timeRoutine.min)
                if(minRecord == minRoutine){
                    const segRoutine = parseInt(timeRoutine.seg)
                    if(segRecord == segRoutine){
                        changesRoutine["timeRecord"] = changesRoutine["timeRecord"]
                    }else{
                        if(segRecord > segRoutine){
                            changesRoutine["timeRecord"] = `${timeRoutine.hour}:${timeRoutine.min}:${timeRoutine.seg}`
                        }else{
                            changesRoutine["timeRecord"] = changesRoutine["timeRecord"];
                        }
                    }
                }else{
                    if(minRecord > minRoutine){
                        changesRoutine["timeRecord"] = `${timeRoutine.hour}:${timeRoutine.min}:${timeRoutine.seg}`
                    }else{
                        changesRoutine["timeRecord"] = changesRoutine["timeRecord"];
                    }
                }
            }else{
                if(hourRoutine < hourRecord){
                    changesRoutine["timeRecord"] = `${timeRoutine.hour}:${timeRoutine.min}:${timeRoutine.seg}`;
                }else{
                    changesRoutine["timeRecord"] = changesRoutine["timeRecord"];
                }
            }
        }else{
            const segundo = parseInt(timeRoutine.seg) + 1
            const timeNow = `${timeRoutine.hour}:${timeRoutine.min}:${segundo <= 9 ? `0${segundo}` : segundo}`;
            changesRoutine["timeRecord"] = timeNow
        }
      
        //Guardar en el localStorage
        const indexRoutine = UserDB.routines.findIndex(item => item.name === routine.name)
        const newUserDB = {...UserDB}
        newUserDB["routines"][indexRoutine] = changesRoutine
        AlterUserDB('UserDB',newUserDB)

    }
    function endRoutine(confirm){
        const newListOnPlay = [...listOnPlay]
        const seriesUnCompleted = []
        
        
            newListOnPlay.forEach( exercise => {
                exercise.series.forEach( serie => {
                    if(serie.completed == false){
                        const index = seriesUnCompleted.findIndex(item => item.name === exercise.name)
                        if(index < 0){
                            seriesUnCompleted.push({name:exercise.name, series:[{id:serie.id}]})
                        }else{
                            seriesUnCompleted[index].series.push({id:serie.id})
                        }
                    }
                })
            })
            if(seriesUnCompleted.length > 0){
                const error = "Has dejado series sin terminar... \n" + "¿Estas seguro que deseas continuar?"
                setError({
                    error:true,
                    type:'next',
                    typeError:error
                })
            }else{
                routineFinish()
            }
        
        
    }

    function success(){
        setVision('dashboard')
        setMessage({message:false,typeMessage:null})
    }

     //Timers

     function createTimer(){
        const data = {...dataForm}
        const newData = {...UserDB}
        const timer =  `${data.min <= 9 ? `0${data.min}` : data.min }:${data.seg <= 9 ? `0${data.seg}` : data.seg }`
        if(newData.countdown < 3){
            newData.countdown.unshift(timer)
        }else{
            newData.countdown.pop()
            newData.countdown.unshift(timer)
        }
        
        AlterUserDB('UserDB',newData)
        
     }


    return(
        <AppContext.Provider
        value = {{
            vision,setVision,
            panelAdd,setPanelAdd,
            modal,setModal,
            UserDB,AlterUserDB,
            formCreate,setFormCreate,
            counter,setCounter,
            listOnPlay,setListOnPlay,
            routine,setRoutine,
            error,setError,
            message,setMessage,
            timeRoutine, setTimeRoutine,
            listExercises,
            routineOnPlay,
            selectOnList,
            addExerciseToList,
            deleteExerciseOfList,
            createExercise,
            deleteExercise,
            getDataForm,
            AddSerie,
            formRoutine,
            AddRoutine,
            changeVision,
            deleteSerie,
            goRoutine,
            finishSerie,
            endRoutine,
            success,
            routineFinish,
            createTimer
        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}