import { Component } from "react";
import Person from "./Person/Person";

class Persons extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   return state;
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Persons.js] shouldComponentUpdate");
    // remember here is only comparing the pointer address.
    // hence with that, please take note, change something to persons in App.js
    // are creating new array instead of directly update the value of the property.
    // you must do this.
    if (nextProps.persons !== this.props.Persons) {
      return true;
    } else {
      return false;
    }
    //return true; //used to check to allowed to update component or not
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return {
      message:
        "Test Do Something, which is this will get in componentDidUpdate",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate");
    console.log(snapshot);
  }

  componentWillUnmount() {
    console.log(
      "[Persons.js] componentWillUnmount, " +
        "use this for cleaning up stuff, like cleaning connection or what" +
        "this will be executed once the component is removed"
    );
  }
  render() {
    console.log("[Persons.js] render");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          key={person.id}
          name={person.name}
          age={person.age}
          click={() => this.props.clicked(index)}
          changed={(event) => this.props.changed(event, person.id)}
          switchName={(event) => this.props.switchName(person.id)}
        />
      );
    });
  }
}

export default Persons;
