import React from "react";
import '../style.css';

const TotalValue = (props) => {
  

  return (
    <div>
      <div style={{marginTop:"1rem"}}><b>Portfolio value in USD</b></div>
      <p style={{fontSize:"2rem"}}>${props.value}</p>
    </div>
  )
}

export default TotalValue;