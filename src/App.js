import React from "react";
import Header from "./components/Header/Header";
import HelloUser from "./components/HelloUser/HelloUser";
import { LastTrain } from "./components/LastTrain/LastTrain";
import { Section } from "./components/Section/Section";
import { AddSomething } from "./components/AddSomething/AddSomething";
import { List } from "./components/Routines/List/List";
import { RoutineItem } from "./components/Routines/Routine/RoutineItem";
import { Folder } from "./components/Folder/Folder";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./components/Main/Main";
import './App.scss'

const routines = [
  { name:"Espalda",
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
  { name:"Piernas",
  done:3,
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
}
]

const exercises = [["Pull ups","Pull ups","Pull ups","Pull ups"],["Chin ups","Chin ups","Chin ups","Chin ups"]]


const folders = [
  {
    name:"Tiron",
    routines:[routines[0],routines[1]]
  },
  {
    name:"Empuje",
    routines:[routines[0],routines[1]]
  }
]

function App() {
  const [vision,setVision] = React.useState('dashboard')

  return (
    <React.Fragment>
      {vision == "dashboard" && 
      <Main className="dashboard">
        <Header>
          <HelloUser user="Juan Cristobal"/>
          <LastTrain/>
        </Header>
        <Section className="sectionRoutines">
          <AddSomething
          text="Tus rutinas"
          vision="addRoutine"
          setVision={setVision}
          className="addRoutine"
          />
          <List>
          {routines.map(routine => (
            <RoutineItem
            name={routine.name}
            nExercises={routine.exercises.length}
            done={routine.done}
            time={routine.time}
            />
          ))}
          </List>
        </Section>
        <Section className="sectionFolder">
          <AddSomething
            text="Tus carpetas"
            vision="addFolder"
            setVision={setVision}
            className="addFolder"
            />
            <List>
            {
              folders.map(folder => (
                <Folder
                folderName = {folder.name}
                routines = {folder.routines}
                />
              ))
            }
            </List>
        </Section>
        <Footer/>
      </Main>
      }
      {vision == "addRoutine" &&
        <Main className="addRoutine">
          <Section className="title">
            <p>Estas creando una rutina:</p>
          </Section>
          <List>
          {exercises.map(exercise => 
          <div>
            {exercise.map(item => 
            <p>{item}</p>  
            )}
            <button>+</button>
          </div>)}
          </List>
          <div>
            <button>Añadir ejercicio</button>
          </div>
          <div>
            <button>Añadir rutina</button>
          </div>
        </Main>
      }
      {vision == "addFolder" && <div>Add Folder</div>}
    </React.Fragment>
  );
}

export default App;
