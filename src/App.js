import React from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import Generate from './components/generate';
import { Route, Routes } from "react-router-dom";
import Main from './pages/main';
import Teams from './pages/teams'
import { useNavigate} from "react-router-dom"
import bg from './img/background.jpg'
import GenerateSavedTeams from './components/generateSavedTeams'

function App() {
  const navigate = useNavigate();  
  const [teamSize, setTeamSize] = React.useState(2);

  function handleTeamSize(e){
    setTeamSize(parseInt(e.target.value));
  }
  
  const [players, setPlayers] = React.useState(
    JSON.parse(localStorage.getItem("players")) || 
    [
    {
      id: nanoid(),
      name: ""
    }
  ])

  React.useEffect(() => {
      localStorage.setItem("players", JSON.stringify(players))
  }, [players])

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

const [generatedTeams, setGeneratedTeams] = React.useState([])



  
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
      return <Generate group={ele} key={index} />
    })
  };
  setTeamToSave(slicedArray);
  setGeneratedTeams(renderGroups());   
}

// maxCalls prevents from calling infinite recurse function in generateNextTeams(). When all possible team variations are already found.
let maxCalls=0;

function generateNextTeams(){
  const newShuffledArr = players.map(ele=>ele);
    shuffle(newShuffledArr);  
    const slicedArray = chunk(newShuffledArr, teamSize);
    //sort teams by player name
    for(let i = 0; i < slicedArray.length; i++){
      slicedArray[i].sort(compare);
    }
    //Check if new teams are not repeating    
    const notRepeating = [];   
    if(maxCalls < 100){
      maxCalls++;
      if(notRepeating.length === 0 || notRepeating.includes(false)){
        for(let i = 0; i < savedTeams.length; i++){
          for(let j = 0; j < savedTeams[i].length; j++){
            for(let l = 0; l < slicedArray.length; l++){ 
              const conditions = []; 
              for(let x = 0; x < teamSize; x++){
                conditions.push(savedTeams[i][j][x].name === slicedArray[l][x].name)
              }  
              console.log("conditions",conditions);      
              if(conditions.filter((rule) => rule === true).length === conditions.length){
                notRepeating.push(false);
              } else {
                notRepeating.push(true);
              }
            }          
          }
        }
      }
      // if teams are repeating then recurse the function, else display that team
      if(notRepeating.includes(false)) {
        generateNextTeams()
      } else {
        function renderGroups(){
          return slicedArray.map((ele, index) => {
            return <Generate group={ele} key={index} />
           })
         };
         setTeamToSave(slicedArray);
         setGeneratedTeams(renderGroups());  
      }
    } else {
      alert("Sorry, could not find any new teams")
    }
    
}

function deletePlayer(id){
  setPlayers(prev=>{
    return prev.filter(ele=>{
     return ele.id !== id
    })
  })
}

const [savedTeams, setSavedTeams] = React.useState(
  JSON.parse(localStorage.getItem("savedTeams")) || []
);
const [displaySavedTeams, setDisplaySavedTeams] = React.useState([]);

React.useEffect(() => {
  localStorage.setItem("savedTeams", JSON.stringify(savedTeams))
}, [savedTeams])

function generateSavedTeams(){
  function renderSavedTeams(){
    return savedTeams.map((saved, index)=>{      
      return (
        <div className="wrap">
          <h2 className="team-number">Teams nr. {index+1}</h2>
          {
            saved.map((ele, index)=>{
            return <GenerateSavedTeams groupedTeams={ele} key={index}/>
            })
          }
        </div>
      )    
    })
  }; 
  setDisplaySavedTeams(renderSavedTeams())
}

React.useEffect(()=>{
  generateSavedTeams()
},[savedTeams])

function saveTeam(){
  setSavedTeams(prev=>{
    return [
      ...prev,
      teamToSave
    ]
  });  
}

function reset(){
  setSavedTeams([]);
  navigate("/");
}
  
console.log("savedTeams", savedTeams);
console.log("displaySavedTeams", displaySavedTeams);

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <Routes>  
        <Route path='/' element={<Main handleTeamSize={handleTeamSize} teamSize={teamSize} players={players} handleChange={handleChange} deletePlayer={deletePlayer} addNewPlayer={addNewPlayer} generateTeams={generateTeams} navigate={navigate} />}/>
        <Route path='/teams' element={<Teams generatedTeams={generatedTeams} saveTeam={saveTeam} generateNextTeams={generateNextTeams} reset={reset} displaySavedTeams={displaySavedTeams}   />}/>
      </Routes>  
    </div>
  );
}

export default App;

