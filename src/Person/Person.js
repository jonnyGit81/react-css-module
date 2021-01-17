import React from "react";
// import Radium from "radium";
// import "./Person.css";

//using styled-components
import styled from "styled-components";

const person = (props) => {
  // Using styledComponent
  const StyleMyDiv = styled.div`
     {
      width: 30%;
      margin: 16px auto;
      border: 1px solid #eee;
      box-shadow: 0 2px 3px #eec;
      padding: 16px;
      text-align: center;
    }

    @media (min-width: 500px) {
      width: "450px";
    }
  `;

//   const mediaQueryStyle = {
//     "@media (min-width: 500px)": {
//       width: "450px",
//     },
//   };
  return (
    // <div className="Person" style={mediaQueryStyle}>

    //change to use styled-components, it turn the style as react componnent
    <StyleMyDiv>
      <p onClick={props.click} onDoubleClick={props.doubleClick}>
        I'm Persons ! {props.name} and my age {props.age}
      </p>
      <p>{props.children}</p>

      {/* two way binding */}
      <input type="text" onChange={props.changed} value={props.name} />
      <span>
        <button onClick={props.switchName}>Switch Name</button>
      </span>
    </StyleMyDiv>

    // </div>
  );
};

// export default Radium(person);

export default person;
