import React from 'react';
import './teams.css'

export default function Teams(props){
    return(
      <div className="teams-main">
        <div className="teams-main-container">
        <h1 className="teams-heading" >Generated teams:</h1>
        <div className="generated-teams">
          {props.displaySavedTeams}       
          <div>{props.generatedTeams}</div> 
        </div>
        <div className="buttons">
          <button type="button" className="reset-btn" onClick={props.reset} >Reset and change players</button>
          <button type="button" className="save-team-btn" onClick={()=>{props.saveTeam();}} >Confirm Teams</button>
          <button type="button" className="generate-btn" onClick={props.generateNextTeams} >Generate Next Teams</button>
        </div>        
      </div>
      </div>
      
    )
}