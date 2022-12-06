

# Example 1: Prop Drilling App
Goals: 
- Explain what context is
- Use the Context API to provide and consume context

##### Motivation:
What is life like without context? 

# Prop Drilling: 
```js
- TodoApp   - [{id: 1, text: "walk the dog"}]
  - TodoForm
  - TodosList
    - TodoItems
      <li> to edit/checkbox the app, update state to TodoApp.
```
Editing would require a function in TodoApp and pass it down to TodoList to TodoItems.
We might have a piece of state storing whether somebody is loggedIn or what permissions they have.
We might have 20/100s components nested in one tree. We might want to know what the value of current user is in a great great great great great great great grandchild component...


# Consuming Context:
What is Context?
 - Universal data across your app. (It's about CONTROL, not universal access)
```jsx
<Child /> // Has access to count
<Todos /> // Doesn't have access to count.
```
 - Data accessible across all components.

# Why is it useful?
 - Prop drilling / tunneling
 - Less repetition
 - Useful for global themes (language preferences for an app, current user, dark mode/light mode), shared data (across components)

* CONTEXT is NOT a replacement for ALL state in app, where you store every possible piece of data using the context api. We still wanna make our components relatively contained whenever possible. 
BUT IN PAINFUL SITUATIONS, it can alleviate some of that tunneling.

# The way CONTEXT works is in 3 steps

# Example 2: Consuming Context App

### 1. Creating context

Context, at the bare minimum, is very simple to create.
```jsx
import React from "react";

// Looks like this. REACT.CREATECONTEXT()....
const CountContext = React.createContext();

// Export our CREATECONTEXT...
export default CountContext;
```
Above is usually placed in a separate file. Might even be in a separate directory if we have multiple context.


Inside Family folder, create a file called CountContext.jsx
```jsx
// Family/CountContext.jsx

import React from "react";

const CountContext = React.createContext();

export default CountContext;
```

Note, this does not do a whole lot for us right now.

[React Context Docs](https://reactjs.org/docs/context.html)

React.createContext is going to return an object. On that particular object, there
is a special component called "Provider". 
The "Provider" component will wrap around some hierarchy in our app (Child component maybe???)... EVERYTHING nested inside that Provider will have access to whatever data
is stored on the context. 

# Step 2:
import countContext...
Wrap countContext around whatever component we want to use it...

Example:
```jsx
// Family/Child.jsx
import CountContext from './CountContext';
  ...
  return (
    // We can scope Provider around <GrandChild /> ONLY if we want... 
    <CountContext.Provider>
      <div style={{ border: '4px solid #0074D9', margin: '1rem', width: '500px'}}>
        <p>I'm the child!</p>
        <p>I own COUNT! It is {count}</p>
        <GrandChild count={count} addToCount={addToCount}/>
      </div>
    </CountContext.Provider>
  )
```

Now... Let's SPECIFY What DATA does this context provide to child components?
That's where our VALUE PROP comes in!
Every context provider accepts a value, and allows access to child components...
Note! We can only have a single THING that pass to value (obj, arr, etc..)... ONE THING ONLY THOUGH!

Let's go ahead and pass count as the value.
```jsx
// Family/Child.jsx
import CountContext from './CountContext';
  ...
  return (
    // We can scope Provider around <GrandChild /> ONLY if we want... 
    <CountContext.Provider value={count}>
      <div style={{ border: '4px solid #0074D9', margin: '1rem', width: '500px'}}>
        <p>I'm the child!</p>
        <p>I own COUNT! It is {count}</p>
        <GrandChild count={count} addToCount={addToCount}/>
      </div>
    </CountContext.Provider>
  )
```

Now, let's try and read count in GreatGrandChild. 
Eliminate those props. And the props parameters to our components as well!
We can't access count quite yet...

Comment out BUTTON on GreatGrandChild...
Problem now. Console says "I don't know what count is!"
If I run my app, I get that same error in chrome. 'count' is not defined.

Basically, the Provider is only part of the equation. That is setting up/providing the value, but we have to consume it.

##### 1. In order to consume/subscribe to the value, we need the useContext hook!
##### 2. Without explicitly consuming/subscribing, the value isn't available to components further down in the hierarchy.

In GreatGrandChild
```jsx
import CountContext from './CountContext';
import {useContext} from "react";

function GreatGrandChild() {
  // I don't have to call it count, it's just that I'm already calling count below...
  const count = useContext(CountContext);

  // Obviously it would be easier if we just made the count state in here, but 
  // if we have something like todos
  return (
    <div style={{border: '4px solid #6FDBFF', margin: '1rem'}}>
      <p>I'm a great-grandchild</p>
      <p>Count is: {count} </p>
      {/* <button onClick={addToCount}>Increment Count</button> */}
    </div>
  )
}

export default GreatGrandChild;
```

IT WORKS! Notice how no props are passed down. GreatGrandChild has access to Child component. Review time. How did we set this up?

1. Have the context set up. E.G. CountContext.jsx file...
2. Have the Provider where we specify the value.
3. Have the consumer set up by useContext.
Note: Class based components.. you'd use the following...
```jsx
<Context.Consumer></Context.Consumer>
```
But not with hooks! useContext makes it WAAAAAY easier. 


Let's add a button in the Child component above <GrandChild />
```jsx
// Family/Child.jsx
<button onClick={addToCount}>Add to Count</button>
```
TEST...

### Hands to Keyboard!
GreatGrandChild had a baby! Congratulations! You know what to do.
Let's create a GREAT-GREAT-GRAND-CHILD... let's useContext and pass down count...

Only things nested inside that Provider are able to consume it.

Prove that we don't have to name it count...
```jsx
const count = useContext(CountContext)
// and the bottom
const num = useContext(CountContext)
```

What if I wanna update the count from DOWN HERE?   
=*(

# Step 3: 

Context Updating State:

1. useContext looks for the nearest matching context, and reads its value.
2. When the value inside of the context changes, components consuming/subscribing to that context will re-render.

But... What about updating the count stored in child from great great grandchild?

##### Setting State from a Consumer:
- We can also pass state-setting functions into providers, so taht any component using context can potentially set state on an ancestor.

```jsx
// Family/Child.jsx

<CountContext.Provider value={{count, addToCount}}>
bleh bleh bleh
</CountContext.Provider>

```
BIG ERROR MESSAGE NO! OH NO! Now what?

and now in greatgreatgrandchild...
```jsx
// Family/GreatGreatGrandChild.jsx
// Destructuring object in GreatGrandChild and GreatGreatGrandChild as well.
const {count, addToCount} = useContext(countContext)

<button onClick={addToCount}>Increment Count</button>
// If you wanted some arguments....
<button onClick={() => addToCount(3)}>Increment Count</button>
// Or we can set up a function in our component that we could call.
```

That's the basics of the CONTEXT API!






