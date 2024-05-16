import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link as RouterLink, useNavigate } from 'react-router-dom' // Importing Link from react-router-dom
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { dark } from '@mui/material/styles/createPalette'
import { toast } from 'react-toastify'

function Login({ setuserLoggedin }) {
  const navigate = useNavigate()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      usernanme:formData.get('username')
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        data
      )
   
      if (response.status === 200 || response.data) {
        toast.success('Login successful')
        sessionStorage.setItem('accessToken', response.data)
        localStorage.setItem('accessToken', response.data)
        setuserLoggedin(true)
        navigate('/home')
      } else {
        toast.error('Invalid email or password')
      }

    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred')
      } else if (error.request) {
        toast.error('Network error. Please try again later.')
      } else {
        toast.error('An error occurred. Please try again later.')
      }
    }
  }

  const theme = createTheme(dark)

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <RouterLink to={'/register'} variant='body2'>
                  Don't have an account? Sign up
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login
