import React from "react";
import cssClasses from "./Person.modules.css";

const person = (props) => {
  return (
    <div className={cssClasses.Person}>
      <p onClick={props.click} onDoubleClick={props.doubleClick}>
        I'm Persons ! {props.name} and my age {props.age}
      </p>
      <p>{props.children}</p>

      {/* two way binding */}
      <input type="text" onChange={props.changed} value={props.name} />
      <span>
        <button onClick={props.switchName}>Switch Name</button>
      </span>
    </div>
  );
};

// export default Radium(person);

export default person;
