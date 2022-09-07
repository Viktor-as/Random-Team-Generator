import React from 'react';
import './App.css';
import Player from './components/player';
import { nanoid } from 'nanoid'
import Generate from './components/generate'

function App() {
  

  
  const [teamSize, setTeamSize] = React.useState(2)

  function handleTeamSize(e){
    setTeamSize(e.target.value);
  }
  
  const [players, setPlayers] = React.useState([
    {
      id: nanoid(),
      name: ""
    }
  ])

  function handleChange(id, event) {
    setPlayers(prev=>{
      return prev.map(ele=>{
        if(ele.id === id){
          return {
            ...ele,
            name: event.target.value
          }
        } else {
          return ele
        }
      })
    })
   }
  
   console.log(players)

   function addNewPlayer(){
    setPlayers(prev=>{
      return [
        ...prev,
        {
          id: nanoid(),
          name: ""
        }
      ]
    })
   }

   const [generatedTeams, setGeneratedTeams] = React.useState()

   // Display Generated Teams from shuffled players
  function generate(){
    const generateArr = [];
    for (let i = 0; i < players.length /2; i++){
      generateArr.push(<Generate shuffledPlayers={shuffledPlayers}  setShuffledPlayers={setShuffledPlayers} teamSize={teamSize} />)
  } 
  console.log("generateArr" + generateArr)
  return generateArr
  }

  

  const [shuffledPlayers, setShuffledPlayers] = React.useState([])

  function generateTeams() {
    //The Fisher Yates Method - shuffle our array
    setShuffledPlayers(()=>{
      const newShuffledArr = players;
      for (let i = newShuffledArr.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = newShuffledArr[i]
        newShuffledArr[i] = newShuffledArr[j]
        newShuffledArr[j] = k
      }
      return newShuffledArr;
    });
     
    setGeneratedTeams(generate());   
  }

  console.log("shufled players" + JSON.stringify(shuffledPlayers)); 
  return (
    <div className="App">
      <div className="team-size-form">
        <form >
          <p>Enter the number of players in a team</p>
        <input type="number" name="teamSize" onChange={handleTeamSize} value={teamSize}/>
        </form>
      </div>
      <div className="form">
        <p>Enter player </p>
      <form>
        {
          players.map(ele=> <Player name={ele.name} handleChange={handleChange} id={ele.id}/>)
        }
      </form>

    
      <button type="button" className="add-player" onClick={addNewPlayer} >Add one more player</button>
      <button type="button" className="generate-btn" onClick={generateTeams} >Generate Teams</button>
      <p>Generated teams:</p>
      {generatedTeams}
      </div>
    </div>
  );
}

export default App;