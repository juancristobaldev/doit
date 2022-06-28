import React from "react";
import { AppContext } from "./hooks/AppContext";
import { DashBoard } from "./components/DashBoard/DashBoard";
import { AddRoutine } from "./components/Routines/AddRoutine/AddRoutine"
import { GoRoutine } from "./components/Routines/GoRoutine";
import './App.scss'

function AppUI() {
  const {
    vision,
        } = React.useContext(AppContext)
  
  return (
    <React.Fragment>
      {vision == "dashboard" && <DashBoard/>}
      {vision == "addRoutine" && <AddRoutine/>}
      {vision == "addFolder" && <div>Add Folder</div>}
      {vision == "goRoutine" && <GoRoutine/>}
    </React.Fragment>
  );
}

export default AppUI;
