import React from 'react';
import './teams.css'

export default function Teams(props){
    return(
      <div className="teams-main">
        <div className="teams-main-container">
          <h1 className="teams-heading" >Generated teams:</h1>        
          <div className="generated-teams"> 
            <div className="generated-teams-inner">
              {props.displaySavedTeams}       
              <div>
                <h2 className="team-number">Generated team</h2>
                {props.generatedTeams}
              </div> 
            </div>  
            
          </div>
          <div className="buttons">
            <button type="button" className="reset-btn" onClick={props.reset} >Reset and change players</button>
            <button type="button" className="save-team-btn" onClick={()=>{props.saveTeam();}} >Confirm Teams</button>
            <button type="button" className="generate-btn" onClick={props.generateNextTeams} >Generate Next Teams</button>
          </div>  
          <div className="instructions">
            <h2 className="instruction-heading">How to use the App:</h2>  
            <p>Confirm Teams button - saves generated teams in memory.</p>
            <p>Generate Next Teams button – generates teams but not the same as saved teams.</p>
            <p>Reset and change players button – erases saved teams memory and allows to change players.</p>
          </div>      
        </div>
      </div>
      
    )
}