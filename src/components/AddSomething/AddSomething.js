import React from "react";
import './AddSomething.scss'
function AddSomething({text,vision,setVision,className}){
    return(
        <div className={"addSomething " + className}>
            <h2>{text}</h2>
            <button onClick={(event) => setVision(vision)}>Nuevo</button>
        </div>
    )
}

export {AddSomething}