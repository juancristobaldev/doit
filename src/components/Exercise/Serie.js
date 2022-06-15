import React, { useState } from "react";

function Serie({name}){
    const [key,setKey] = React.useState(0)
    return(
            <div key={setKey(key + 1)}>
                <p>{name}</p>
                <input type="number"/>
            </div>
    )
}

export { Serie }