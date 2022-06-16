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

  /*  const DB = {
        name:'Juan Cristobal',
        routines:[
            { 
                name:"Espalda",
                done:6,
                time:"48:30min",
                exercises:[
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    },
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    },
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    }
                ]
            },
            { 
                name:"Piernas",
                done:4,
                time:"66:6",
                exercises:[
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    },
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    },
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    }
                ]
            }
        ],
        folders:[
            {
              name:"Tiron",
              routines:[]
            },
            {
              name:"Empuje",
              routines:[{ 
                name:"Espalda",
                done:6,
                time:"48:30min",
                exercises:[
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    },
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    },
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    }
                ]
            },{ 
                name:"Espalda",
                done:6,
                time:"48:30min",
                exercises:[
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    },
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    },
                    {
                        nameExercise:"Pull ups",
                        series:4,
                        reps:12
                    }
                ]
            }]
            }
          ]
    } */
    
    const UserDB = itemLocalStorage
    const AlterUserDB = saveItemLocalStorage
    const [vision,setVision] = React.useState('dashboard')
    const [panelAdd,setPanelAdd] = React.useState(false)
    const [list,setList] = React.useState([])
    const [dataForm,setDataForm] = React.useState({})
    console.log(dataForm)
    const [exercises,setExercises] = React.useState(UserDB.exercises)
    const [formCreate,setFormCreate] = useState({
        name:null,
        muscle:null,
        type:null
    })
    const [modal, setModal] = React.useState('select')
  
  
    function AddSerie(exercise){
      const nameSerie = exercise[0]
      const newSerie = [...list]
      newSerie.forEach(serie => {
        if(serie[0] == nameSerie){
          serie.push(nameSerie)
        }
      })
      setList(newSerie)
    }
    function selectExercise(nameExercise){
        const indexArray = exercises.findIndex(item => item.name == nameExercise)
        const newList = [...exercises]

        newList.forEach(item => {
            item.select = false
        })

        newList[indexArray].select = true
        setExercises(newList)
    }   

    function addExerciseToList(){
        const exerciseSelect = exercises.filter(select => select.select == true)
        if(!exerciseSelect){console.log('Selecciona algo')}
        else{
            const nameExerciseSelect = exerciseSelect[0].name
            const newExercisesList = exercises.filter(item => item.name !== nameExerciseSelect)
            const newList = [...list]
            let error = undefined
            list.forEach(itemList => {
                if(itemList == nameExerciseSelect ){
                    console.log('No puedes agregar dos veces el mismo ejercicio')
                    error = true
                }
            })
            if(!error){
                newList.push([nameExerciseSelect])
                setList(newList)
                setExercises(newExercisesList)
                setPanelAdd(false)
            }
        }
    }

    function createExercise(event){
        event.preventDefault()
        const newExercise = {
            name:dataForm.name,
            muscle:dataForm.muscle,
            type:dataForm.type,
            reps:null,
            series:null,
            select:false,
            key:UserDB.exercises.length + 1
        }
        const newUserDB = {...itemLocalStorage}
        newUserDB.exercises.push(newExercise)
        AlterUserDB('UserDB',newUserDB)
        setModal("select")

    }

    function getDataForm(event,name){
        const data = dataForm
        data[name] = event.target.value
        setDataForm(data)
    }

    return(
        <AppContext.Provider
        value = {{
            vision,setVision,
            panelAdd,setPanelAdd,
            exercises,setExercises,
            list,setList,
            modal,setModal,
            UserDB,AlterUserDB,
            formCreate,setFormCreate,
            AddSerie,
            selectExercise,
            addExerciseToList,
            createExercise,
            getDataForm
        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}