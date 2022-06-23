import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const AppContext = React.createContext()

function AppProvider({children}){
    const {itemLocalStorage,saveItemLocalStorage} = useLocalStorage('UserDB',{
        name:'Juan Cristobal',
        routines:[],
        folders:[],
        exercises:[]
    })
    const UserDB = itemLocalStorage
    const AlterUserDB = saveItemLocalStorage
    const [error,setError] = useState({error:false,typeError:null})
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
            time:null,
            endpoints:null,
            exercises:[],
            active:null
        }
    )
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

    function AddSerie(nameExercise){
        const newListExercises = [...listOnPlay],
        exercise = newListExercises.findIndex(item => item.name === nameExercise),
        id = newListExercises[exercise].series.length + 1;
        newListExercises[exercise]["series"].push({id:id,reps:0})
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
                    Routine.exercises[indexExercise].serie.push({id:name,reps:element.target.value})
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
            const id = UserDB.exercises.findIndex(item => item.name === exercise.name)
            const newObject = {...UserDB.exercises[id]}
            newObject["series"] = exercise.serie
            console.log(newObject["series"])
            newListOnPlay.push(newObject)
        })
        setRoutine(routine)
        setListOnPlay(newListOnPlay)
        setVision("goRoutine")
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
            listExercises,
            routineOnPlay,
            selectOnList,
            addExerciseToList,
            createExercise,
            getDataForm,
            AddSerie,
            formRoutine,
            AddRoutine,
            changeVision,
            deleteSerie,
            goRoutine,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}