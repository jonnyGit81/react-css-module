import cssClasses from "./App.css";
import React, { Component } from "react";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

class App extends Component {
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
