import React from "react";
import Phonetic from "./Phonetic";
import Meaning from "./Meaning";



export default function Results(props) {
    if(props.results) {
    return(
                 <section className="Results" aria-live="polite">
       <h2> {props.results.word} </h2>
                {props.results.phonetics && props.results.phonetics.map(function (phonetic, index) {
        return (
            <div key={index} >
            <Phonetic phonetic={phonetic} />
            </div>
        );
        })}
    
    {props.results.meanings && props.results.meanings.map(function (meaning, index){
        return (
             <div key={index}>
        <Meaning meaning={meaning} /> 
        </div>
        );
       })}
       
</section>
    );
    
} else {
    return null;
}
   
}