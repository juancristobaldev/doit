import React from "react";
import './Folder.scss'
import { RiFlag2Fill } from 'react-icons/ri'
function Folder({folderName,routines}){
    return(
        <div className="Folder">
            <div className="folderName">
                <h3>{folderName}</h3>
            </div>
            {routines.map(routine => (
            
                <React.Fragment>
                    <div className="routine"
                    key={folderName}
                    >
                        <div><p>{routine.name}</p></div>
                        <div className="routineDone"><RiFlag2Fill/><p>{routine.done}</p></div>
                    </div>
                </React.Fragment>
            ))}
            <div className="seeMore">
                <button>Ver más</button>
            </div>
        </div>
    )
}

export {Folder}