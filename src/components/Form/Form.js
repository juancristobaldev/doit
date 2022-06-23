import React from "react";

function Form({onSubmit,className,children}){
    return(
        <form className={className} onSubmit={onSubmit}>
            {children}
            <input className="addExercise" type={"submit"} value="Agregar ejercicio"/>
        </form>
    )
}

export {Form}