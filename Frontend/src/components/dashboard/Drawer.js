import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import MaterialTable_Edit_Menu from './MaterialTable_Edit_Menu'
import SalesAnalysis from './SalesAnalysis_Day'
import { Link } from 'react-router-dom'
import './Drawer.css'
import color from '@material-ui/core/colors/amber'
import LineChart_month from './LineChart_month'
import Grid from '@material-ui/core/Grid'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#e57373',
    color: '#00000'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))

export default function PermanentDrawerLeft () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' noWrap>
            <Link className='link' to='/'>
              Control Panel
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='left'
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Product', 'Order'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <EqualizerIcon /> : <ShoppingCartIcon />}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Grid container item xs={12} direction='row' spacing={3}>
          <SalesAnalysis />
          <LineChart_month />
        </Grid>

        <br />
        <br />
        <MaterialTable_Edit_Menu />
      </main>
    </div>
  )
}
