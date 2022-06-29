import React, { useContext } from "react";
import { Main } from "../Main/Main";
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
        <Nav/>
        <Section className="sectionRoutines">
        <AddSomething
        alter="addRoutine"
        className="addRoutine"
        />
        <List 
        style={UserDB.routines.length == 0 ? 
          {
            opacity:"50%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            textAlign:"center"
          }:{
              overflowY:"auto"
            }
        } className="ListRoutines">
          {UserDB.routines.length == 0 && <p>No hay rutinas <br/> 🏋🏻 </p>}
          {UserDB.routines.map(routine => (
            <RoutineItem
            routine={routine}
            name={routine.name}
            nExercises={routine.exercises.length}
            done={routine.endpoints ? routine.endpoints : 0}
            time={routine.timeRecord ? routine.timeRecord : '00:00'}
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