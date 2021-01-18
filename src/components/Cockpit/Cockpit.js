import cssClasses from "./Cockpit.modules.css";
import lifeCycleImg from "../../assets/lifecycle_hooks.jpeg";

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
      <img
        src={lifeCycleImg}
        alt="Life Cycle Hooks On Class Component"
        height="400"
        width="800"
      />
      <p className={assignClasses.join(" ")}>React is working</p>

      <button className={buttonClass} onClick={props.clicked}>
        Show Persons
      </button>
    </div>
  );
};

export default cockpit;
