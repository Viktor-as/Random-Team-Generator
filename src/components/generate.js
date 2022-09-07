import React from 'react'

export default function Generate(props){

let team = props.shuffledPlayers.slice(0, props.teamSize); 

function sliceTeams(size){
    props.setShuffledPlayers(prev=>{
    return prev.splice(size, prev.length)
    })
}

sliceTeams(props.teamSize)

return (
    <div className="container">
        {team}
    </div>
)    
}