import React from "react";
import './List.scss'
function List({children,className}){
    return(
        <div className={className}>
            {children}
        </div>
    )
}

export {List}