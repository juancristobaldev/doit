import React from "react";
import './List.scss'
function List({children,className,style}){
    return(
            <div style={style} className={className}>
            {children}
            </div>
    )
}

export {List}