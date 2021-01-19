import React, { Component, Fragment } from 'react';
import cssClasses from './Person.modules.css';
//import Aux from '../../hoc/Aux';
//import WithClass from '../../hoc/WithClass';

class Person extends Component {
  render() {
    console.log('[Person.js] render');
    return (
      // <Fragment>
      // <Aux>
      //<WithClass classes={cssClasses.Person}>

      <div className={cssClasses.Person}>
        <p onClick={this.props.click} onDoubleClick={this.props.doubleClick}>
          I'm Persons ! {this.props.name} and my age {this.props.age}
        </p>
        <p>{this.props.children}</p>
        {/* two way binding */}
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
        <span>
          <button onClick={this.props.switchName}>Switch Name</button>
        </span>
      </div>
      //</WithClass>
      //<Fragment/>
      //</Aux>
    );
  }
}

export default Person;
