import React from "react";
import Header from "./components/Header/Header";
import HelloUser from "./components/HelloUser/HelloUser";
import { LastTrain } from "./components/LastTrain/LastTrain";
import { Section } from "./components/Section/Section";
import { AddSomething } from "./components/AddSomething/AddSomething";
import { List } from "./components/List/List";
import { RoutineItem } from "./components/Routines/Routine/RoutineItem";
import { Folder } from "./components/Folder/Folder";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./components/Main/Main";
import { Modal } from "./components/Modal/Modal";
import './App.scss'
import { ExercisesForm } from "./components/ExerciseForm/ExerciseForm";
import { AppContext } from "./hooks/AppContext";
import { Exercise } from "./components/Exercise/Exercise";
import { Serie } from "./components/Exercise/Serie";
import { OpenModalExercise } from "./components/Buttons/OpenModalExercise";
import { SaveRoutine } from "./components/Buttons/SaveRoutine";
function AppUI() {


  const {
    vision,
    setVision,
    panelAdd,
    setPanelAdd,
    list,
    setList,
    AddSerie,
    UserDB,
    AlterUserDB
        } = React.useContext(AppContext)
  
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
          alter="addRoutine"
          className="addRoutine"
          />
          <List className="ListRoutines">
          {UserDB.routines.length == 0 && <p>No hay rutinas <br/> 🏋🏻 </p>}
          {UserDB.routines.map(routine => (
            <RoutineItem
            name={routine.name}
            nExercises={routine.exercises.length}
            done={routine.done}
            time={routine.time}
            key={routine.name}
            />
          ))}
          </List>
        </Section>
        <Section className="sectionFolder">
          <AddSomething
            alter="addFolder"
            className="addFolder"
            />
            <List className="ListFolders">
            {UserDB.folders.length == 0 && <p>No hay carpetas <br/> 📁 </p>}
            {UserDB.folders.map(folder => (
                <Folder
                folderName = {folder.name}
                routines = {folder.routines}
                key={folder.name}
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
            <input/>
          </Section>
          <List className="ListExercises">
          {list == false && <p>Añade tu primer ejercicio <br/> 🏋🏻</p>}
          {list.length > 0 && list.map(
            exercise => 
            <Exercise exercise={exercise}>
              {exercise.map(item =>
                <Serie item={item}/>
              )}
            </Exercise>
          )}
          </List>
          <OpenModalExercise/>
          <SaveRoutine/>
          {panelAdd && 
            <Modal>
              <ExercisesForm/>
            </Modal>
          }
        </Main>
      }
      {vision == "addFolder" && <div>Add Folder</div>}
    </React.Fragment>
  );
}

export default AppUI;
