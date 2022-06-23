import React, { useContext } from "react";
import { AppContext } from "../../hooks/AppContext";

function ListExercises({className,style}){
    const { listExercises,selectOnList } = useContext(AppContext)
    return(
        <div 
        className={className}
        style={style}
        >
        {listExercises.map(exercise => 

            <div 
            className="itemExerciseSelect"
            style={
            exercise.select ? 
                {
                    border:"1px solid black",
                    borderRadius:"0.5rem"
                } : {
                    border:"1px solid transparent"
                }
            }
            onClick={() => selectOnList(exercise.name)}
            key={exercise.name}
            >
                <p>{exercise.name}</p>
                <div 
                style={ exercise.select ? 
                        {
                            background:"black"
                        }:{}}
                        className="circle"></div>
                </div>            
            )
        }  
        </div>
    )
}

export {ListExercises}