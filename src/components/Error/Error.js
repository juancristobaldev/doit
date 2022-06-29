import React, { useContext } from "react";
import { AppContext } from "../../hooks/AppContext";
import {BiErrorAlt} from "react-icons/bi"
import './Error.scss'
function Error(){
    const {error,setError,routineFinish} = useContext(AppContext)
    return(
        <div className="background">
            <div className="Error">
                <div className="iconError"><BiErrorAlt/></div>
                <div className="typeError">{error.typeError}</div>
                {error.type !== 'next' ? <div className="buttonError"><button onClick={() => setError({error:false,typeError:null})}>Aceptar</button></div> 
                : 
                <div className="buttonsError">
                    <button className="continue" onClick={() => routineFinish()}>Continuar</button>
                    <button className="cancel" onClick={() => setError({error:false,type:null,typeError:null})}>Cancelar</button>
                </div>
                }
            </div>
        </div>
    )
}

export {Error}