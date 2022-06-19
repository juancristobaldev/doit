import React from "react";
import { AddRoutine } from "./components/AddRoutine/AddRoutine";
import { AppContext } from "./hooks/AppContext";
import { DashBoard } from "./components/DashBoard/DashBoard";
import './App.scss'

function AppUI() {
  const {
    vision,
    panelAdd,
    listOnPlay,
    UserDB
        } = React.useContext(AppContext)
  
  return (
    <React.Fragment>
      {vision == "dashboard" && <DashBoard/>}
      {vision == "addRoutine" && <AddRoutine/>}
      {vision == "addFolder" && <div>Add Folder</div>}
    </React.Fragment>
  );
}

export default AppUI;
