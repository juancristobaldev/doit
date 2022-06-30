import React, { useContext } from "react";
import { AppContext } from "../../hooks/AppContext";
import {MdDeleteForever} from "react-icons/md"

function ListExercises({className,style}){
    const { listExercises,selectOnList,deleteExercise } = useContext(AppContext)
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
                {exercise.select === true &&
                    <MdDeleteForever 
                        onClick={() => deleteExercise(exercise.name)}
                        style={{cursor:"pointer"}}
                    />
                }
            </div>            
            )
        }  
        </div>
    )
}

export {ListExercises}