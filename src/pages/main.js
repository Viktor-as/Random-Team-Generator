import React from 'react';
import Player from '../components/player'
import './main.css'

export default function Main(props){
    return (
        <div className="main">
            <div className="main-container">
                <h1 className="heading">Team Generator</h1>    
                <div className="team-size-form">
                    <form >
                    <p>Enter the number of players in a team</p>
                    <input type="number" name="teamSize" onChange={props.handleTeamSize} value={props.teamSize}/>
                    </form>
                </div>
                <div className="form">
                    <p>Enter player names</p>
                    <form>
                    {
                    props.players.map(ele=> <Player name={ele.name} handleChange={props.handleChange} id={ele.id} key={ele.id} deletePlayer={props.deletePlayer} />)
                    }
                    </form>
                </div>
                <div className="buttons">
                    <button type="button" className="add-player" onClick={props.addNewPlayer} >Add one more player</button>
                    <button type="button" className="generate-btn" onClick={()=> {props.generateTeams(); props.navigate("/teams");}} >Generate Teams</button>
                </div>
            </div>            
        </div>
        
    )
}