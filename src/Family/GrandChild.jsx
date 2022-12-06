import GreatGrandChild from './GreatGrandChild';

function GrandChild({ count, addToCount }) {
  return (
    <div style={{border: '4px solid #39CCCC', margin: '1rem' }}>
      <p>I'm the grandchild</p>
      <GreatGrandChild count={count} addToCount={addToCount} />
    </div>
  )
}

export default GrandChild;