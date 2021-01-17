import "./App.css";
import React, { Component } from "react";
// import Radium, { StyleRoot } from "radium";
import Person from "./Person/Person";

import styled from "styled-components";

const StyledMyButton = styled.button`
      background-color: ${(props) =>
        props.checkConditionCanBeAnyNameIsOnlyAProps ? "red" : "green"};
      color: white;
      font: inherit;
      border: 1px solid blue;
      padding: 8px;
      cursor: pointer;
      display: inline-block;

      &:hover {
        background-color: ${(props) => testUsingFunction(props)}; 
        color: black;
      },
`;

const testUsingFunction = (props) => {
  return props.checkConditionCanBeAnyNameIsOnlyAProps ? "salmon" : "lightgreen";
};

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
    //console.log("switch name clicked");
    //DON'T do thus, not gonna work, need to setState from Componnent this.state.persons[0].name = 'ABA'

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
    //console.log("switch name clicked");
    //DON'T do this, not gonna work, need to setState from Component this.state.persons[0].name = 'ABA'

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
    // const persons = this.state.persons // not safe, because object and array are reference type,
    // use javascript slice or ES6 spread operator
    // const persons = this.state.persons.slice();
    // or
    const persons = [...this.state.persons]; //this will create new array.

    persons.splice(deletedIndex, 1);
    this.setState({ persons: persons });
  };

  render() {
    // to be able to style sudo selector and mediaquery, use radium
    // npm install --save radium
    // or you can use another thirdparty lib styled-components
    // npm install --save styled-components

    // const myButtonStyle = {
    //   backgroundColor: "green",
    //   color: "white",
    //   font: "inherit",
    //   border: "1px solid blue",
    //   padding: "8px",
    //   cursor: "pointer",
    //   display: "inline-block",
    //   ":hover": {
    //     backgroundColor: "lightgreen",
    //     color: "black",
    //   },
    // };

    let personJSX = null;

    if (this.state.showPersons) {
      // myButtonStyle.backgroundColor = "red";
      // myButtonStyle[":hover"] = {
      //   backgroundColor: "salmon",
      //   color: "black",
      // };

      personJSX = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={this.switchNameHandler.bind(this, person.id)}
                // doubleClick={() => this.deletePersonHandler(index)}
                // same as above
                doubleClick={this.deletePersonHandler.bind(this, index)}
                changed={(event) => this.textOnChangeHandler(event, person.id)}
                switchName={(event) => this.switchNameHandler(person.id)}
              />
            );
          })}

          {/* 
          change it to from loop above
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
          />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, "newName2")}
            changed={this.textOnChangeHandler}
          >
            Hobbies : Sleep
          </Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age}
          /> */}
        </div>
      );
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red");
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }
    return (
      // <StyleRoot>
      <div className="App">
        <h1>I'm react Component</h1>
        <p className={classes.join(" ")}>React is working</p>
        {/* first way */}
        {/* <button onClick={this.switchNameHandler.bind(this, "newName1")}>
          Switch Name
        </button> */}

        {/* second way not recommended because react will render too often, this can be in efficient*/}
        {/* inline style */}
        <StyledMyButton
          checkConditionCanBeAnyNameIsOnlyAProps={this.state.showPersons}
          // style={myButtonStyle}
          onClick={this.toggleShowPersonHandler.bind(this)}
        >
          Show Persons
        </StyledMyButton>

        {/* 
          this is hard to manage
        {this.state.showPersons ? (
          <div>
            <Person
              name={this.state.persons[0].name}
              age={this.state.persons[0].age}
            />
            <Person
              name={this.state.persons[1].name}
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this, "newName2")}
              changed={this.textOnChangeHandler}
            >
              Hobbies : Sleep
            </Person>
            <Person
              name={this.state.persons[2].name}
              age={this.state.persons[2].age}
            />
          </div>
        ) : null}
         */}

        {/* change it to using variable from render method */}
        {personJSX}
      </div>
      // </StyleRoot>
    );
  }
}

// export default Radium(App);
export default App;
