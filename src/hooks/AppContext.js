import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const AppContext = React.createContext()

function AppProvider({children}){
    const {itemLocalStorage,saveItemLocalStorage} = useLocalStorage('UserDB',[])

    const UserDB = itemLocalStorage
    const AlterUserDB = saveItemLocalStorage

    const [vision,setVision] = React.useState('dashboard')
    const [panelAdd,setPanelAdd] = React.useState(false)
    const [list,setList] = React.useState([])
    const [exercises,setExercises] = React.useState(
        [
            {name:"Pull ups",select:false},
            {name:"Chin ups",select:false},
            {name:"Push ups",select:false},
            {name:"Wide pull ups",select:false}
        ]
    )
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

    function addExercise(){
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

    

    return(
        <AppContext.Provider
        value = {{
            vision,setVision,
            panelAdd,setPanelAdd,
            exercises,setExercises,
            list,setList,
            modal,setModal,
            AddSerie,
            selectExercise,
            addExercise,
            UserDB,AlterUserDB

        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}