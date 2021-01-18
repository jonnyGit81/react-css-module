import cssClasses from "./Cockpit.modules.css";

const cockpit = (props) => {
  let buttonClass = "";
  if (props.showPersons) {
    buttonClass = cssClasses.Red;
  }

  const assignClasses = [];
  if (props.persons.length <= 2) {
    assignClasses.push(cssClasses.red);
  }
  if (props.persons.length <= 1) {
    assignClasses.push(cssClasses.bold);
  }

  return (
    <div className={cssClasses.Cockpit}>
      <h1>{props.appTitle}</h1>
      <p className={assignClasses.join(" ")}>React is working</p>

      <button className={buttonClass} onClick={props.clicked}>
        Show Persons
      </button>
    </div>
  );
};

export default cockpit;
