import React from 'react'
import './generate.css'

export default function Generate(props){

function renderGroup(arr){
    return arr.map((ele, index) => {
       return (
        <div className="player" key={index}>
            {ele.name}
        </div>
    )
    })
};
return (
    <div className="generate-container">
        {renderGroup(props.group)}
    </div>
)    
}