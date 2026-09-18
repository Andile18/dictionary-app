import React from "react";


export default function Phonetic (props){
    if (!props.phonetic.text && !props.phonetic.audio) {
        return null;
    }

    return (
        <div className="Phonetic">
         {props.phonetic.audio && <a href={props.phonetic.audio} target="_blank" rel="noreferrer">Listen</a>}
         {props.phonetic.text && <span>{props.phonetic.text}</span>}
        </div>
    )
}