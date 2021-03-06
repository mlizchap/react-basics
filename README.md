# React-Basics

## Examples
- [React Movie App](https://github.com/mlizchap/react-movie-app)
- [React Todo](https://github.com/mlizchap/react-todo)

## Toc
- [create-react-app](#create-react-app)
- [JSX](#jsx)
- [Components](#components)
  - [Functional Components](#functional-components)
  - [Class Components](#class-components)
- [Rendering Elements](#rendering)
- [Props](#props)
- [PropTypes](#proptypes)
- [State](#state)
- [Events](#events)
- [Forms](#forms)
- [Refs](#refs)
- [Context](#context)
- [Lifecycle Methods](#lifecycle-methods)

## create-react-app
- to start:
  `create-react-app <app-name>`
- comes with built in functionality:
<table>
<tr><td>React</td><td>libraries for creating react componentents and rendering them</td></tr>
<tr><td>webpack</td><td>links together js files</td></tr>
<tr><td>jest</td><td>automated test runner</td></tr>
</table>


## JSX<span id="jsx"></span>
- a syntax extension to javascript.  Used with react to descritbe what the UI should look like.  
- Babel compiles JSX down to `React.createElement()` calls

## Components<span id="components"></span>

### Functional Components<span id="functional-components"></span>
- can accept props but cannot have state 
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

### Class Components<span id="class-components"></span>
- can have state plus some additional features
```javascript
class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

## Rendering Elements<span id="rendering"></span>
```javascript
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## Props<span id="props"></span>
- an object that gives components the ability to receive data from the parent component; make components reusable 
- to give a component props 
  ```javascript
  // class component
  class DummyComponent extends React.Component {
    render() {
      return <div>Hello {this.props.name}</div>;
    }  
  }
  // functional component 
  function Welcome(props) {
    return <div>Hello {props.name}</div>
  }
  ```
- when using the component:
  ```javascript
  <DummyComponent name="Jane" />
  <DummyComponent name="Joe" />
  ```

- when passing multiple props down from components, you can wrap them in an object and use the spread notation.
  ```javascript
  <Component x={} y={} z={} />
  ```
  can become...
  ```javascript
  var props = { x: 1, y: 1, z:1 };
  <Component {...props} />
  ```
### Default Props
- a class property of component 
- sets default props for the class 
  ```javascript
  class CustomButton extends React.Componet {
    //...
  }
  CustomButtton.defaultProps = {
    color: 'blue'
  }

  render() {
    return <CustomBttton /> // props.color is set to blue 
  }
  ```
## PropTypes 
- checks if props are a certain type
- install the propType library
  ```javascript
  $ npm install prop-types
  ```
  ```javascript
  import PropTypes from 'prop-types';
  ```
- declare prop types of a function:
  ```javascript
  class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }
  Greeting.propTypes = {
    name: PropTypes.string
  };
  ```
 - other prop types:
  ```javascript
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  ```
- to make required: 
  ```javascript
  requiredFunc: PropTypes.func.isRequired,
  ```
- [for more information click here](https://reactjs.org/docs/typechecking-with-proptypes.html)

## State<span id="state"></span>
- an object that determines how a component renders and behaves 
- (local) state: cannot be accessd outside of the component and can only be used and modified inside the component
- when the state changes, the component re-renders
- declaring state: 
  ```javascript
  class Test extends Component {
    constructor(props) {
      super(props);

      this.state = { something: "value" }
    }
  }
  ```
  - to reference state
    ```javascript
    <h1>{this.state.something}</h1>
    ```
- **asynchronous state**: because `this.props` and `this.state` may be updated asynchronously, you should 

### setState<span id="setstate"></span>
- a react.Component method that changes a componemt's state
  `this.setState(updater, callback)`
  - `updater`: can be a object or a function
  - `callback`: optional, runs after setState is completed and the component is rendered
- updater as a function:
  ```javascript
  this.setState((prevState, props) => {
    return { counter: prevState.counter + props.step }
  })
  ```

## Events<span id="events"></span>
- events in React are similar to handling events on DOM elements, except:
  - React events are named in camelCase
  - With JSX you pass a function as the event handler rather than a string
  ```javascript
  <button onClick={doSomething}>
  ```
  - to prevent defailt in JSX you must call `preventDefault`
  ```javascript
  function doSomething(e) {
    e.preventDefault()
    //...
  }
  ```
  - e is a synthetic event - a cross-browser wrapper around the browser's native event
  - if other arguments are used, e will be passed as the last argument 
- it's also worth noting that `this` is not bound to class methods by default.  To bind `this`: 
  - use the `public class fields syntax`:
  ```javascript
  handleClick = () => {
    // handle click with stuff here
  }
  ```
  - bind in the constructor: 
  ```javascript
  this.handleClick = this.handleClick.bind(this);
  ```
  - use the arrow function (not recommended): 
  ```javascript
  <button onClick={(e) => this.handleClick(e)}>
  ```

## Forms<span id="forms"></span>
- in DOM elements, form keep some internal state.  
- In React we should use `controlled components`
  - by default `<input>`, `<textarea>` and `<select>` maintain their own state based on user input.  In react, state should only be updated with `setState()`.  We alsways want to make the value of our elements equals to the components appropriate state for that value.
    ```java
    handleChange(e) {
      this.setState({ value: e.taget.value })
    }
    //...
    <input value={this.state.value} onChange={this.handleChange} />
    ```
- textarea:
  ```javascript
    <textarea value={this.state.value} onChange={this.handleChange}>
    text goes here
    </textarea>
  ```
- select: 
  ```javascript
    this.state = {selectValue: "option1"}

    <select value={this.state.selectValue} onChange={this.handleSelect}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  ```
- multiple values: 
  - make the name the same as the element's controlled state name, and use `event.target.name` to set the state with the computed value
```javascript
    //...
    this.state = {
      inputValue: "", 
      selectValue: "option3"
    }
    //...
    handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
    //...
    <input name="inputValue" type="text" value={this.state.inputValue} onChange={this.handleChange} />
            
    <select name="selectValue" value={this.state.selectValue} onChange={this.handleChange}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  ```

## Refs<span id="refs"></span>
- a direct reference to a DOM element (use sparingly)
- creating a property
```javascript
constructor(props) {
  super(props);
  
  this.input = React.createRef();
}
```
- using callbacks:
  ```javascript
    // callback has access to the dom element 
    <input ref={(input) => this.inputText = input} />
  ```
- to get access to the DOM element 
  ```javascript
  this.inputText
  ```
- can retrieve the value, manipulate focus, etc.
  ```javascript
  this.inputText.focus()
  this.inputText.current.value // gets the current value
  ```
  
## Context 
- Normally data is passed from Parent to child via props.  This can get messy when the children props that need data from the parent are heavily nested. 
- **Context API**:  can inject data at any level.  To do this you need a `Provider` and a `Consumer`
1.  Make a new context
- in `Provider.js`
  ```javascript
  export const MyContext = React.createContext();
  ```
2.  Create a Provider Component
- in `Provider.js`
  ```javascript
  class MyProvider extends Component {
      state = { name: 'jane'}

      render() {
          return (
              <MyContext.Provider value={this.state.name}>
                  {this.props.children}
              </MyContext.Provider>
          )
      }
  }
  ```
3. **Set up the Provider**: Import Provider and and wrap the Application in it, whenever the provider updates, its child components will also update
- in `index.js`
  ```javascript
    import MyProvider from './Provider';

    export class App extends Component {
        render() {
            return (
                <MyProvider>
                  <App />
                </MyProvider>
            )
        }
    }
  ```
4.  **Setup the consumer to pass data** whenever a component needs data from the provider, user the `contextName.Consumer` as a parent compnent, using the context that the Consumer component returns, render the component and use the `context` to grab data from the provider
- in `componentName.js`
    ```javascript
    import {MyContext} from './Provider';

    <MyContext.Consumer>
      {context => <div>{context}</div>}
    </MyContext.Consumer>
    ```

- can pass down functions (actions) to update the state 
  - wrap the state and functions in an object, use `this.setState` to update state
    ```javascript
    <MyContext.Provider value={{
        state: this.state,
        makeCaps: () => this.setState({
            name: this.state.name.toUpperCase() 
        })
    }}>
        {this.props.children}
    </MyContext.Provider>
    ```
  - access the state with `val.state` or `val.fnName` 
    ```javascript
    <MyProvider>
        <MyContext.Consumer>
            {val => {
                return (
                    <div>
                        <div>Name: {val.state.name}</div>
                        <button onClick={val.makeCaps}>MAKE CAPS</button>
                    </div>
                )
            }}
        </MyContext.Consumer>
    </MyProvider>
    ```
- using userinput to change the state 
  - in the provider, give arguments for the method that will update the state
    ```javascript
    <MyContext.Provider value={{
        state: this.state,
        changeName: (input) => this.setState({
            name: input
        })

    }}>
        {this.props.children}
    </MyContext.Provider>
  ```
 - in the consumer, pass the user input as the arg
   ```javascript
   changeName = (e, context) => {
      e.preventDefault();
      console.log(this.state.val)
      context.makeCaps()
      context.changeName(this.state.val)    
    }
   
    /* ... */
    
    <MyContext.Consumer>
        {val => {
            return (
                <div>
                    <form onSubmit={(e, context) => this.changeName(e, val)}>
                        <input val={this.state.val} onChange={(e) => this.setState({ val: e.target.value})}/>
                    </form>
                </div>
            )
        }}
    </MyContext.Consumer>
   ```
#### Forceupdate
- a react.Component method
- by default a component rerenders when the state or props change, this causes `render()` to be called explicitely 
- use sparingly

## React.Component Methods 

### Lifecycle Methods (current)<span id="lifecycle"></span>
- methods React calls for you

#### Render 
- only required method
- should **not** modify the component's state, should be pure and return the same results each time.  
- not invoked when `shouldComponentUpdate()` returns false 

#### Constructor 
- the purpose is to set the state and bind methods 
- called before mounting 

#### ComponentDidMount 
- invoked immediately after a component is mounted.  
- a good place for loading data
- by the time its called, the component has rendered at least once 

#### ComponentDidUpdate(prevProps, prevState, snapshot)
- an opportunity to render to the DOM after the component has been rendered 
- called after all the children have been updated.  The last thing to be executed.
- ex: an app that collects input data from the user and then updates data to the DB. 

#### componentWillUnmount
- invoked immediately before a component is updated and destroyed.
- used for cleanup - invalidating timers, canceling requests or cleaning up subscriptions

#### shouldComponentUpdate 
- by default this method re-renders after every state change
- can compare the current state/props to nextState and nextProps, can return false to say that the update can be stopped

#### getDerivedStateFromProps
- invoked right before calling the render method on initial mount and subsequent updates
- returns an object to update state or null to not update anything 

#### getSnapShotBeforeUpdate 
- invoked right before the most recently rendered output is commited to the DOM - allows your component to capture some information from the DOM
- the value will be passed as a param to componentDidUpdate 

#### componentDidCatch(error, info)
- catches JS errors anywhere in their child component tree, log these errors and displays a fallback UI instad of a component tree that crashed 

### Legacy Lifecycle Methods 
- componentWillMount
- componentWillRecieveProps(nextProps)
- componentWillUpdate 


