import React, { useState } from "react";

function Serie({item}){
    return(
        <div>
            <p>{item}</p>  
            <input type="number"/>
        </div>
    )
}

export { Serie }