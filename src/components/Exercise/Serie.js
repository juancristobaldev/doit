import React, { useState,useContext } from "react";
import { AppContext } from "../../hooks/AppContext";
function Serie({name,reps}){
    const {getDataForm} = useContext(AppContext)
    return(
        <div>
            <p>{name}</p>  
            <input name={reps} onChange={element => getDataForm(element,name)} type="number"/>
        </div>
    )
}

export { Serie }