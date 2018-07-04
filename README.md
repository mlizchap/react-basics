# React-Basics

- to start:
  `create-react-app <app-name>`

## JSX 
- a syntax extension to javascript.  Used with react to descritbe what the UI should look like.  
- Babel compiles JSX down to `React.createElement()` calls

## Components

### Functional Components 
- can accept props but cannot have state 
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

### Class Components
- can have state plus some additional features
```javascript
class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

## Rendering Elements
```javascript
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## Props 
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

## State
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
## Events
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

## Forms
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

## Lifecycle Methods 
- **componentDidMount()**: runs after the component output has been rendered to the DOM 


## Refs 