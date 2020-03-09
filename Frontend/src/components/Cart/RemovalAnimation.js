// import React, { useState, useEffect } from 'react'
// import { useTransition, animated } from 'react-spring'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
// import axios from 'axios'

// export default function RemovalAnimation (prop) {
//   let propItems = prop.items
//   const [items, setList] = useState(propItems)

//   // const [index, setIndex] = useState(0)

//   // useEffect(() => {
//   //   let token = localStorage.token
//   //   const config = {
//   //     headers: { Authorization: `Bearer ${token}` }
//   //   }
//   //   axios
//   //     .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
//   //     .then(res => {
//   //       let items = res.data
//   //       let grand_total = 0
//   //       items.forEach(item => {
//   //         grand_total += item.quantity * item.price
//   //       })

//   //       console.log(items)
//   //       setList(items)
//   //     })
//   //     .catch(error => console.log('error:', error))
//   // }, [])

//   const removeFromList = () => {
//     var nItems = items.slice()
//     nItems.pop()
//     setList(nItems)
//   }
//   const transitions = useTransition(items, item => item.orderItemID, {
//     initial: { transform: 'translate3d(0%, 0%,0)' },
//     from: { transform: 'translate3d(0%,-100%,0)' },
//     enter: { transform: 'translate3d(0%, 0%,0)' },
//     leave: { transform: 'translate3d(100%,0%,0)' }
//   })

//   console.log(transitions);
  
//   return (
//     <div>
//       {/* <button onClick={addToList}>add</button> */}
//       {/* {prop.items} */}

//       {transitions.map(({ item, props, key }) => {
//         console.log(item)
//         console.log(props)
//         console.log(key)

//         return (
//           <div>
//             <animated.div style={props}></animated.div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }
