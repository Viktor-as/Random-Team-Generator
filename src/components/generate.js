import React from 'react'
import './generate.css'

export default function Generate(props){

function renderGroup(arr){
return arr.map((ele) => {
    console.log(ele.name);
    return (
        <div className="player">
            {ele.name}
        </div>
    )
})
};
return (
    <div className="container">
        {renderGroup(props.group)}
    </div>
)    
}