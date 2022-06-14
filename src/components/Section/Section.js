import React from "react";
import './Section.scss'
function Section({children,className}){
    return(
        <section className={className}>
            {children}
        </section>
    )
}

export {Section}