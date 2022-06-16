import React from "react";

function FormControl({as,name,type,children,label,onChange,className}){
    return(
        <React.Fragment>
            {as == "select" && !label &&
            <div className={className}>
                <select
                className={className}
                onChange={(event) => onChange(event,name)}
                >
                {children}
                </select>
            </div>
            }
            {as == "select" && label && 
                <div className={className}>
                    <label>{label}</label>
                    <select 
                    onChange={(event) => onChange(event,name)}
                    >
                    {children}
                    </select>
                </div>
            }
            {as == "input" && !label && <input onChange={(event) => onChange(event,name)} type={type}/>}
            {as == "input" && label && 
                <div className={className}>
                    <label>{label}</label>
                    <input onChange={(event) => onChange(event,name)} type={type}/>
                </div>
            }
        </React.Fragment>
    )
}

export {FormControl}