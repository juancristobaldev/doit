import React from "react";

import './Main.scss'

function Main({children,className}){
    return(
        <main className={className}>
            {children}
        </main>
    )
}

export {Main}