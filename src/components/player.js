import React from 'react'


export default function Player(props){

return (
<div className="input">
    <input
        type="text"
        placeholder="First Name"
        onChange={(event)=>props.handleChange(props.id, event)}
        name="firstName"
        //value={formData.firstName}
    />
</div>



)
}