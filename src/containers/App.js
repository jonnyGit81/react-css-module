import cssClasses from './App.module.css';
import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import withClass2 from '../components/hoc/WIthClass2';
import Aux from '../components/hoc/Aux';

import AuthContext from '../auth-context/auth-context';

class App extends Component {
  constructor(props) {
    console.log('[App.js] constructor, Next is to getDerivedStateFromProps');
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    console.log(
      '[App.js] getDerivedStateFromProps, Next is to Render ',
      props,
      state,
    );
    return state;
  }

  //executed only once time
  componentDidMount() {
    console.log(
      '[App.js] componentDidMount, Code your side effect code here, e.g HTTP CALL, next To componentDidUpdate ',
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      '[App.js] shouldComponentUpdate, Executed before, we can cancel update here. next to Render',
    );
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      '[App.js] componentDidUpdate, Code your side effect code here, e.g HTTP CALL',
    );
  }

  state = {
    persons: [
      { id: 'anyID1', name: 'Johnny', age: 28 },
      { id: 'anyID2', name: 'Billy', age: 29 },
      { id: 'anyID3', name: 'Jimmy', age: 30 },
    ],
    othersState: 'this value wont impact, since we only update persons state',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    isAuthenticated: false,
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
      (person) => person.id === searchId,
    );

    //best practice to always using spread operator, for preventing mutable.
    const person = {
      ...this.state.persons[findPersonIndex],
    };

    //best practice
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[findPersonIndex] = person;

    // if you have to update state depend on previous state, please do this as the best practice
    // example the counter of change
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
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

  dummyLoginHandler = () => {
    this.setState({ isAuthenticated: true });
  };

  dummyLogoutHandler = () => {
    this.setState({ isAuthenticated: false });
  };

  render() {
    console.log(
      '[App.js] render, Next is to Render all child, and next is to componentDidMount',
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
      // <div className={cssClasses.App}>
      <Aux>
        <button
          onClick={() =>
            this.setState({ showCockpit: !this.state.showCockpit })
          }
        >
          Test UseEffect Cockpit Cleaning UP
        </button>

        <br />
        <br />

        {/* here we use react context to pass context to any component we want */}
        <AuthContext.Provider
          value={{
            authenticated: this.state.isAuthenticated,
            login: this.dummyLoginHandler,
            logout: this.dummyLogoutHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              appTitle={this.props.appTitle}
              personsLength={this.state.persons.length}
              clicked={this.toggleShowPersonHandler}
              showPersons={this.state.showPersons}
            />
          ) : null}
          {personsJSX}
        </AuthContext.Provider>
      </Aux>
      // </div>
    );
  }
}

// this higher component are can be used such as java script code handled error, or send google analytic ect
// can add html, javascript logic, or style
export default withClass2(App, cssClasses.App);

// using prop-types
// npm install --save prop-types
// this is for prevent passing invalid type to the props
