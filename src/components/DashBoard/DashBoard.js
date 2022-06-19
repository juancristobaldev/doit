import React, { useContext } from "react";
import { Main } from "../Main/Main";
import { Header } from "../Header/Header";
import { HelloUser } from "../HelloUser/HelloUser";
import { LastTrain } from "../LastTrain/LastTrain";
import { Section } from "../Section/Section";
import { AddSomething } from "../AddSomething/AddSomething";
import { List } from "../List/List"
import { Folder} from "../Folder/Folder"
import { Footer} from "../Footer/Footer"
import { RoutineItem } from "../Routines/Routine/RoutineItem"
import { AppContext } from "../../hooks/AppContext";
import { Nav } from "../Nav/Nav"

function DashBoard(){
    const {UserDB} = useContext(AppContext)
    return(
        <Main className="dashboard">
        <Nav></Nav>
        <Section className="sectionRoutines">
          <AddSomething
          alter="addRoutine"
          className="addRoutine"
          />
          <List style={UserDB.routines.length == 0 && {opacity:"50%",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}} className="ListRoutines">
          {UserDB.routines.length == 0 && <p>No hay rutinas <br/> 🏋🏻 </p>}
          {UserDB.routines.map(routine => (
            <RoutineItem
            name={routine.name}
            nExercises={routine.exercises.length}
            done={routine.done ? routine.done : 0}
            time={routine.time ? routine.time : '00:00'}
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
            {UserDB.folders.length == 0 && <p style={{
                opacity:"50%"
            }}>No hay carpetas <br/> 📁 </p>}
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
    )
}

export {DashBoard}