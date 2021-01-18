import cssClasses from "./App.css";
import React, { Component } from "react";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

class App extends Component {
  constructor(props) {
    console.log("[App.js] constructor, Next is to getDerivedStateFromProps");
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    console.log(
      "[App.js] getDerivedStateFromProps, Next is to Render ",
      props,
      state
    );
    return state;
  }

  //executed only once time
  componentDidMount() {
    console.log(
      "[App.js] componentDidMount, Code your side effect code here, e.g HTTP CALL, next To componentDidUpdate "
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate, next to Render");
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[App.js] componentDidUpdate, Code your side effect code here, e.g HTTP CALL");
  }

  state = {
    persons: [
      { id: "anyID1", name: "Johnny", age: 28 },
      { id: "anyID2", name: "Billy", age: 29 },
      { id: "anyID3", name: "Jimmy", age: 30 },
    ],
    othersState: "this value wont impact, since we only update persons state",
    showPersons: false,
  };

  switchNameHandler = (id) => {
    let currentPersons = [...this.state.persons];
    let updatedIndex = currentPersons.findIndex((p) => p.id === id);
    let person = currentPersons[updatedIndex];
    currentPersons.splice(updatedIndex, 1);
    person.name =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    currentPersons.splice(updatedIndex, 0, person);
    this.setState({
      persons: currentPersons,
    });
  };

  textOnChangeHandler = (event, searchId) => {
    const findPersonIndex = this.state.persons.findIndex(
      (person) => person.id === searchId
    );

    //best practice to always using spread operator, for preventing mutable.
    const person = {
      ...this.state.persons[findPersonIndex],
    };

    //best practice
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[findPersonIndex] = person;

    this.setState({
      persons: persons,
    });
  };

  toggleShowPersonHandler = () => {
    const showPersons = this.state.showPersons;
    this.setState({ showPersons: !showPersons });
  };

  deletePersonHandler = (deletedIndex) => {
    const persons = [...this.state.persons]; //this will create new array.
    persons.splice(deletedIndex, 1);
    this.setState({ persons: persons });
  };

  render() {
    console.log(
      "[App.js] render, Next is to Render all child, and next is to componentDidMount"
    );
    let personsJSX = null;

    if (this.state.showPersons) {
      personsJSX = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.textOnChangeHandler}
          switchName={this.switchNameHandler}
        />
      );
    }

    return (
      <div className={cssClasses.App}>
        <Cockpit
          appTitle={this.props.appTitle}
          persons={this.state.persons}
          clicked={this.toggleShowPersonHandler}
          showPersons={this.state.showPersons}
        />
        {personsJSX}
      </div>
    );
  }
}

export default App;
