import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import './CSS/SignUp.css'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import axios from 'axios'
import { Redirect } from 'react-router'

function Copyright () {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUp (props) {
  const classes = useStyles()
  const [inputs, setInputs] = useState({})
  const [open, setOpen] = React.useState(false)

  function Alert (props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
      console.log('submitting')

      console.log(inputs)
      if (inputs.password1 !== inputs.password2) {
        setOpen(true)
      } else if (!inputs.email) {
        alert('no email')
      } else {
        let token = localStorage.token
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        }
        axios
          .post(
            `${process.env.REACT_APP_API_SERVER}/api/signup`,
            { inputs },
            config
          )
          .then(res => {
            console.log(res)
            if ((res.status = 200)) {
              console.log(props)
              props.history.push(`signUpSuccess`)
            }
          })
      }
    }
  }

  const handleInputChange = event => {
    event.persist()
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography type='submit' component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleInputChange}
                value={inputs.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password1'
                label='Password'
                type='password'
                id='password1'
                autoComplete='current-password'
                onChange={handleInputChange}
                value={inputs.password1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password2'
                label='confirm Password'
                type='password'
                id='password2'
                autoComplete='current-password2'
                onChange={handleInputChange}
                value={inputs.password2}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='#' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
              password does not match!
            </Alert>
          </Snackbar>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
