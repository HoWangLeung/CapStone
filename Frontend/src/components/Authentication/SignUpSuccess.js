import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'

export default function SignUpSuccess () {
  const [items, setList] = useState([
    { key: 1, item: 'one' },
    { key: 2, item: 'two' },
    { key: 3, item: 'three' }
  ])
  const [index, setIndex] = useState(4)
  const addToList = () => {
    setIndex(index + 1)
    var nItems = items.slice()
    nItems.push({ key: index, item: 'new' })
    setList(nItems)
  }
  const removeFromList = () => {
    var nItems = items.slice()
    nItems.pop()
    setList(nItems)
  }
  const transitions = useTransition(items, item => item.key, {
    initial: { transform: 'translate3d(0%, 0%,0)' },
    from: { transform: 'translate3d(0%,-100%,0)' },
    enter: { transform: 'translate3d(0%, 0%,0)' },
    leave: { transform: 'translate3d(100%,0%,0)' }
  })
  return (
    <div>
      <button onClick={addToList}>add</button>
      <button onClick={removeFromList}>remove</button>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <div>{item.item}{item.key}</div>
        </animated.div>
      ))}
    </div>
  )
}
