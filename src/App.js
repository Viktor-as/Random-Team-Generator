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

// Holds generated teams if they need to be saved
const [teamToSave, setTeamToSave] = React.useState([]);


// Function used to sort objects by name
function compare( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

  function generateTeams() {
    const newShuffledArr = players.map(ele=>ele);
    shuffle(newShuffledArr);  
    const slicedArray = chunk(newShuffledArr, teamSize);
    //sort teams by player name
    for(let i = 0; i < slicedArray.length; i++){
      slicedArray[i].sort(compare);
    }
    function renderGroups(){
     return slicedArray.map((ele, index) => {
       return <Generate group={ele} key={index} index={index} />
      })
    };
    setTeamToSave(slicedArray);
    setGeneratedTeams(renderGroups());   
  }
    
function generateNextTeams(){
  const newShuffledArr = players.map(ele=>ele);
    shuffle(newShuffledArr);  
    const slicedArray = chunk(newShuffledArr, teamSize);
    //sort teams by player name
    for(let i = 0; i < slicedArray.length; i++){
      slicedArray[i].sort(compare);
    }
    //Check if new teams are not repeating
    let notRepeating = false;
    if(notRepeating === false){
      for(let i = 0; i < savedTeams.length; i++){
        for(let j = 0; j < savedTeams[i].length; j++){          
          if(savedTeams[i][j][0].name === slicedArray[j][0].name && savedTeams[i][j][1].name === slicedArray[j][1].name){
            notRepeating = false;
          } else {
            notRepeating = true;
          }          
        }
      }
    }
    // if teams are repeating then recurse the function, else display that team
    if(notRepeating === false) {
      generateNextTeams()
    } else {
      function renderGroups(){
        return slicedArray.map((ele, index) => {
          return <Generate group={ele} key={index} index={index} />
         })
       };
       setTeamToSave(slicedArray);
       setGeneratedTeams(renderGroups());  
    }
}

function deletePlayer(id){
  setPlayers(prev=>{
    return prev.filter(ele=>{
     return ele.id !== id
    })
  })
}

const [savedTeams, setSavedTeams] = React.useState([]);

function saveTeam(){
  setSavedTeams(prev=>{
    return [
      ...prev,
      teamToSave
    ]
  })
}
  
console.log("savedTeams", savedTeams);

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
      <button type="button" className="generate-btn" onClick={saveTeam} >Confirm Teams</button>
      <button type="button" className="generate-btn" onClick={generateNextTeams} >Generate Next Teams</button>
      <p>Generated teams:</p>
      {generatedTeams}
      </div>
    </div>
  );
}

export default App;