import React, { Component, Fragment } from 'react';
import cssClasses from './Person.module.css';
import Aux from '../../hoc/Aux';
import WithClass from '../../hoc/WithClass';
import withClass2 from '../../hoc/WIthClass2';

import AuthContext from '../../../auth-context/auth-context';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  //as an alternative and best practice of using react context consumer.
  // react provided nice way since react 16
  // the code below must like that, is the reserved keyword contextType
  // so react will auto make connection for you for the context
  // then you can use this.context.bla2
  static contextType = AuthContext;

  componentDidMount() {
    //you can use react built in ref to target the input element to focus
    //this.inputElement.focus();

    console.log(this.context.authenticated);

    // as the alternative you can use constructor
    this.inputElementRef.current.focus();
  }
  render() {
    console.log('[Person.js] render');
    return (
      // <Fragment>
      // <Aux>

      //<div className={cssClasses.Person}>
      //<WithClass classes={cssClasses.Person}>
      <Aux>
        {/* react context consumer consume a function */}
        {/* <AuthContext.Consumer>
          {(context) =>
            context.authenticated ? <p>User Has Login</p> : <p>Please Login</p>
          }
        </AuthContext.Consumer> */}

        {/* best practice are to use static typeContext as the consumer */}
        {this.context.authenticated ? (
          <p>User Has Login</p>
        ) : (
          <p>Please Login</p>
        )}

        <p onClick={this.props.click} onDoubleClick={this.props.doubleClick}>
          I'm Persons ! {this.props.name} and my age {this.props.age}
        </p>
        <p>{this.props.children}</p>
        {/* two way binding */}

        <input
          // we use react built ref to taget last rendered input to focus()
          // ref={(inputEl) => (this.inputElement = inputEl)}
          // alternative way by using constructor React.createRef.
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
        <span>
          <button onClick={this.props.switchName}>Switch Name</button>
        </span>
      </Aux>
      //</WithClass>
      //</div>
      //<Fragment/>
      //</Aux>
    );
  }
}

// if only using this, the data will be missing
// in order to resolve this is you must forward the props.
// see the code in withclass2 <WrappedComponent {...props}/>
// by using the spread operator
export default withClass2(Person, cssClasses.Person);
