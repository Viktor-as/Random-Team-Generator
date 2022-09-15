import React from 'react'
import './generateSavedTeams.css'

export default function GenerateSavedTeams(props){

function renderSavedGroup(arr){
    return arr.map((ele, index) => {
       return (
        <div className="player" key={index}>
            {ele.name}
        </div>
    )
    })
};
console.log(props.groupedTeams);
return (
    <div className="generate-saved-container">
        {renderSavedGroup(props.groupedTeams)}
    </div>
)    
}