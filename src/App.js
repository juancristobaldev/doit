import React from "react";
import AppUI from "./AppUI";
import { AppProvider } from "./hooks/AppContext";

function App(){
    return(
        <AppProvider>
            <AppUI/>
        </AppProvider>
    )
}

export {App}