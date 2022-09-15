import React from 'react'
import './player.css'
export default function Player(props){

return (
<div className="input">
    <input
        type="text"
        placeholder="First Name"
        onChange={(event)=>props.handleChange(props.id, event)}
        name="firstName"
        value={props.name}
    />
    <div className="close-container" onClick={()=> props.deletePlayer(props.id)}>
        <span className="close" ></span>
    </div>
</div>
)
}

