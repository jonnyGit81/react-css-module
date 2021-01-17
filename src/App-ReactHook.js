import "./App.css";
import { Component } from "react";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { name: "Johnny", age: 28 },
      { name: "Billy", age: 29 },
      { name: "Jimmy", age: 30 },
    ],
    othertState: "this value wont impact, since we only update persons state",
  };

  switchNameHandler = () => {
    //console.log("switch name clicked");
    //DON'T do thus, not gonna work, need to setState from Componnent this.state.persons[0].name = 'ABA'
    this.setState({
      persons: [
        { name: "Change Jonny Name", age: 28 },
        { name: "Billy", age: 29 },
        { name: "Jimmy", age: 30 },
      ],
    });
  };

  render() {
    return (
      <div className="App">
        <h1>I'm react Component</h1>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
        >
          Hobbies : Sleep
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );
  }
}

export default App;
