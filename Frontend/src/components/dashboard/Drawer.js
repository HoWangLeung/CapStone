import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import MaterialTable_Edit_Menu from './MaterialTable_Edit_Menu'
// import SalesAnalysis from './SalesAnalysis_Day'
import { Link } from 'react-router-dom'
import LineChart_month from './LineChart_month'
import Grid from '@material-ui/core/Grid'
import './Drawer.css'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))

export default function PersistentDrawer () {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            <Link className='link' to='/'>
              Control Panel{' '}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Statistic', 'Product Control', 'Order Control', ].map((text, index) => (
            <ListItem button key={text} component={Link} to={"/dashboard/" + text} >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
{/* 
        <Grid container item xs={12} direction='row' spacing={3}>
          <SalesAnalysis />
          <LineChart_month />
        </Grid> */}
    
      </main>
    </div>
  )
}

// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import Drawer from '@material-ui/core/Drawer'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import List from '@material-ui/core/List'
// import Typography from '@material-ui/core/Typography'
// import Divider from '@material-ui/core/Divider'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
// import EqualizerIcon from '@material-ui/icons/Equalizer'
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
// import MaterialTable_Edit_Menu from './MaterialTable_Edit_Menu'
// import SalesAnalysis from './SalesAnalysis_Day'
// import { Link } from 'react-router-dom'
// import './Drawer.css'
// import color from '@material-ui/core/colors/amber'
// import LineChart_month from './LineChart_month'
// import Grid from '@material-ui/core/Grid'

// const drawerWidth = 240

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex'
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     // background: '#36324d',
//     color: '#00000'
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,

//   },
//   drawerPaper: {
//     width: drawerWidth,
//     background: '#36324d',

//   },
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3)
//   }
// }))

// export default function PermanentDrawerLeft () {
//   const classes = useStyles()

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar position='fixed' className={classes.appBar}>
//         <Toolbar>
//           <Typography variant='h6' noWrap>
//             <Link className='link' to='/'>
//               Control Panel
//             </Link>
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={classes.drawer}
//         variant='permanent'
//         classes={{
//           paper: classes.drawerPaper
//         }}
//         anchor='left'
//       >
//         <div className={classes.toolbar} />
//         <Divider />
//         <List>
//           {['Product', 'Order'].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <EqualizerIcon /> : <ShoppingCartIcon />}
//               </ListItemIcon>

//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         {/* <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List> */}
//       </Drawer>

// <main className={classes.content}>
//   <div className={classes.toolbar} />

//   <Grid container item xs={12} direction='row' spacing={3}>
//     <SalesAnalysis />
//     <LineChart_month />
//   </Grid>

//   <br />
//   <br />
//   <MaterialTable_Edit_Menu />
// </main>
//     </div>
//   )
// }
