function GreatGrandChild({ count, addToCount }) {
  // Obviously it would be easier if we just made the count state in here, but 
  // if we have something like todos
  return (
    <div style={{border: '4px solid #6FDBFF', margin: '1rem'}}>
      <p>I'm a great-grandchild</p>
      <p>Count is: {count} </p>
      <button onClick={addToCount}>Increment Count</button>
    </div>
  )
}

export default GreatGrandChild;