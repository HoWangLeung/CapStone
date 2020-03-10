// import React, { Component } from 'react'
// import * as authActions from '../stores/actions/authAction'
// import { connect } from 'react-redux'
// import MaterialTable_Edit_Menu from '../components/dashboard/MaterialTable_Edit_Menu'
// import { Redirect } from 'react-router-dom'
// // import SalesAnalysis from '../components/dashboard/SalesAnalysis_Day'
// import Dash from '../components/dashboard/Statistic'
// import DrawerLeft from '../components/dashboard/Statistic/Drawer'

// import { makeStyles } from '@material-ui/core/styles'
// import Paper from '@material-ui/core/Paper'
// import Grid from '@material-ui/core/Grid'

// class Dashboard extends Component {
//   constructor (props) {
//     super(props)
//   }

//   render () {
//     if (this.props.isLoggedIn === true && this.props.is_admin === true) {
//       return (
//         <div>
//           <DrawerLeft />
//         </div>
//       )
//     } else {
//       return <Redirect to='/' />
//     }
//   }
// }
// const mapStateToProps = state => ({
//   isLoggedIn: state.authReducer.isLoggedIn,
//   is_admin: state.authReducer.is_admin,
//   token: state.authReducer.token
// })

// const mapDispatchToProps = dispatch => ({
//   logoutDispatch: () => {
//     dispatch(authActions.logoutAction())
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
