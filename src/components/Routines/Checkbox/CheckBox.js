import {React,useContext,useState} from "react";
import './checkbox.scss'
import {FaCheck} from 'react-icons/fa'
import { AppContext } from "../../../hooks/AppContext";

function CheckBox({serieID,exerciseName,completed}){
    const {finishSerie} = useContext(AppContext)

    if(completed == true){
        return  <div className="checkBoxItem">
                    <div
                    onClick={() => finishSerie(serieID,exerciseName)}
                    className="checkBoxOn"
                    >
                        <FaCheck fill="white"/>
                    </div>
                </div>
    } 
    else return <div className="checkBoxItem">
                    <div 
                    onClick={() => finishSerie(serieID,exerciseName)} 
                    className="checkBoxOff"
                    >
                </div></div>
}
export{CheckBox}