import React from 'react';
import './App.css';
import Player from './components/player';
import { nanoid } from 'nanoid'
import Generate from './components/generate'

function App() {
    
  const [teamSize, setTeamSize] = React.useState(2)

  function handleTeamSize(e){
    setTeamSize(parseInt(e.target.value));
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
  
   console.log("players", players)

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
  
// Group shuffled players into teams (array of arrays)
  function chunk(array, size) {
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
      chunkedArr.push(array.slice(index, size + index));
      index += size;
    }
    return chunkedArr;
  }

 //The Fisher Yates Method - shuffle our array
  function shuffle(array){
        for (let i = array.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = array[i]
        array[i] = array[j]
        array[j] = k
      }};

  function generateTeams() {
    const newShuffledArr = players.map(ele=>ele);
    shuffle(newShuffledArr);  
    const slicedArray = chunk(newShuffledArr, teamSize);
    function renderGroups(){
     return slicedArray.map((ele, index) => {
       return <Generate group={ele} key={index} index={index} />
      })
    };
    setGeneratedTeams(renderGroups());   
  }
    
function deletePlayer(id){
  setPlayers(prev=>{
    return prev.filter(ele=>{
     return ele.id !== id
    })
  })
}
  
  return (
    <div className="App">
      <div className="team-size-form">
        <form >
          <p>Enter the number of players in a team</p>
        <input type="number" name="teamSize" onChange={handleTeamSize} value={teamSize}/>
        </form>
      </div>
      <div className="form">
        <p>Enter player names</p>
      <form>
        {
          players.map(ele=> <Player name={ele.name} handleChange={handleChange} id={ele.id} key={ele.id} deletePlayer={deletePlayer} />)
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