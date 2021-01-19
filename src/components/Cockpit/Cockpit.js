import cssClasses from "./Cockpit.modules.css";
import lifeCycleImg from "../../assets/lifecycle_hooks.jpeg";
import lifeCycleUpodate from "../../assets/lifecycle_update.jpeg";
import React, { useEffect } from "react";
import { render } from "react-dom";

const Cockpit = (props) => {
  //this is react hook, for functional lifecycle
  // (componentDidMount and componentDidUpdate combined into useEffect)

  // useEffect on first time rendered and based on persons change
  useEffect(
    (effect) => {
      // this useEffect most second important lifecycle for function component
      //this will printed any action on the page, since any changes in App.js is calling Cockpit.
      console.log("[Cockpit.js] useEffect second arguments [props.persons]");
      // you can use HTTP Request Here, since this is called every time and any changes on App.js

      //so this is triggered every time component rendered, what if you want to only call HTTP request
      // on the component rendered first time only, not every re-render cycle.

      //to solve this, in useEffect you can pas second arguments as array,
      // based on that change, [props.persons]
      //react will know when to execute useEffect
      // example here we use the persons state change.
      // you can use more than 1 use Effect.
      setTimeout(() => {
        console.log(
          "second arguments [props.persons] " +
            " fetch some data from cloud!! or save some data to the cloud " +
            "=> this message will printed if only the persons data has change, to every re-render cycle" +
            "but of course the first render this useEffect will get executed, the rest are waiting persons data changed"
        );
      }, 1000);

      return () =>
        console.log(
          "[Cockpit.js] cleaning up, on component are REMOVED or PERSONS CHANGED " +
            " because second argument is array [props.persons]" +
            "REMEMBER FIRST CYCLE RENDER WOULD NOT TRIGGERED HERE"
        );
    },
    [props.persons]
  );

  // useEffect on first time rendered only
  // so it become same as componentDidMount
  useEffect(
    (effect) => {
      console.log(
        "[Cockpit.js] useEffect first time rendered second arguments [] "
      );

      // for cleaningUp componentWillUnmount
      // you can just simply add return a function statement
      return () =>
        console.log(
          "[Cockpit.js] cleaning up, on component are removed ONLY " +
            " because second argument is empty array [] " +
            "REMEMBER FIRST CYCLE RENDER WOULD NOT TRIGGERED HERE"
        );
    },
    [] //for tell react to use useEffect first time rendered only then you can simply pass empty array
  );

  useEffect(() => {
    console.log(
      "[Cockpit.js] useEffect without second arguments, this will get executed every render cycle "
    );

    return () =>
      console.log(
        "[Cockpit.js] cleaning up, every render cycle " +
          " because there is no second argument " +
          " REMEMBER => this clean up is executed before the console log of useEffect executed." +
          " AND AS Always first render would not triggering this cleanup"
      );
  });
  let buttonClass = "";
  if (props.showPersons) {
    buttonClass = cssClasses.Red;
  }

  const assignClasses = [];
  if (props.personsLength <= 2) {
    assignClasses.push(cssClasses.red);
  }
  if (props.personsLength <= 1) {
    assignClasses.push(cssClasses.bold);
  }

  return (
    <div className={cssClasses.Cockpit}>
      <h1>{props.appTitle}</h1>

      <div className={cssClasses.MyDesc}>
        <p>
          This is Component Create Lifecycle Hooks. the getDerivedStateFromProps
          only executed once.
        </p>
      </div>

      <img
        src={lifeCycleImg}
        alt="Life Cycle Hooks On Class Component"
        height="400"
        width="800"
      />

      <hr />

      <div className={cssClasses.MyDesc}>
        <p>
          This is the updating components, which is props or state change for a
          component to re-evaluate by react
        </p>
        <ul>
          <li>
            <strong>getDerivedStateFromProps() </strong>
            <p>
              rarely used, is like some form control is get external property
              and you internally want to handle user input but initialize your
              state or update your state base on outside changes. this course
              are not using this getDerivedStateFromProps
            </p>
          </li>
          <li>
            <strong>shouldComponentUpdate(nextProps, nextState) </strong>
            <p>Interesting, you can use to cancel the update cycle</p>
          </li>
          <li>
            <strong>render() </strong>
          </li>
          <li>
            <strong>getSnapshotBeforeUpdate(prevProps, prevState)</strong>
            <p>
              e.g When user scroll, and you want to add / re-render new element
              to the DOM and you want to restore the user scroll position once
              the update are done
            </p>
          </li>
          <li>
            <strong>componentDidMount()</strong>
            <p>
              You can make a HTTP Request here, but beware you don't create a
              infinite-loop here, e.g. you get the HTTP response, and update the
              component and the life cycle update start again ... This only
              executed once in class component, for functional component we can
              use useEffect useEffect are based on the second parameters. if you
              want to only executed once use [] empty array for the second
              arguments. remember also in useEffect can do clean up task by
              simply adding return () =&gt; your code here..
            </p>
          </li>
        </ul>
      </div>
      <img
        src={lifeCycleUpodate}
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

// React.memo() => componentShouldUpdate for the functional hooks.
// in above Cockpit need to render on 3 conditions :
// 1. person length change
//    we are not rely on the persons array change, only the length of the array,
//    hence with that we just pass props as personsLength instead.
// 2. app.title change
// 3. Show Persons change
// by using React.memo
// first render
// [Cockpit.js] useEffect second arguments [props.persons]
// Cockpit.js:49 [Cockpit.js] useEffect first time rendered second arguments []
// Cockpit.js:66 [Cockpit.js] useEffect without second arguments, this will get executed every render cycle
// Cockpit.js:27 second arguments [props.persons]  fetch some data from cloud!! or save some data to the cloud => this message will printed if only the persons data has change, to every re-render cycle but of course the first render this useEffect will get executed, the rest are waiting persons data changed

// click toggle persons -> true
// [Cockpit.js] cleaning up, every render cycle  because there is no second argument  REMEMBER => this clean up is executed before the console log of useEffect executed. AND AS Always first render would not triggering this cleanup
// Cockpit.js:67 [Cockpit.js] useEffect without second arguments, this will get executed every render cycle

// change persons name
// there is no cockpit log printed. meaning don't have any cockpit rendered
export default React.memo(Cockpit);
