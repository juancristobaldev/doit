import React from "react";
import './List.scss'
function List({children}){
    return(
        <div className="ListRoutines">
            {children}
        </div>
    )
}

export {List}