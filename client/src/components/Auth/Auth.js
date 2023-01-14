import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import jwt_decode from 'jwt-decode'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = await jwt_decode(res.credential);
    const token = res.credential;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push('/')

    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleOAuthProvider clientId="971085984731-uhu6cfn2vrunte4h6fbca59obm20fm5l.apps.googleusercontent.com" justifyContent='center'>
            <GoogleLogin
              onSuccess={credentialResponse => {

                googleSuccess(credentialResponse)

              }}

              shape="rectangle"
              width='360'
              onError={() => {
                alert('Google Sign In was unsuccessful. Try again later')
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
          <Grid container justify="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;

// import { React, useState, } from 'react';
// import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
// import useStyles from './styles';
// import Input from './Input';
// import { useDispatch } from 'react-redux';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// // import Icon from './Icon';
// import { AUTH } from '../../constants/actionTypes';
// import { useHistory } from 'react-router-dom';
// import jwt_decode from 'jwt-decode'
// import { signin, signup } from '../../actions/auth'








// const intialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

// const Auth = () => {

//   const classes = useStyles()
//   const [showPassword, setShowPassword] = useState(false)
//   const [isSignup, setIsSignup] = useState(false)
//   const [formData, setFormData] = useState(intialState)
//   const history = useHistory()
//   const dispatch = useDispatch();
//   const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }
//   const handleSubmit = (e) => {
//     e.preventDefault();


//     if (isSignup) {
//       dispatch(signup(formData, history))
//     } else {
//       dispatch(signin(formData, history))
//     }
//   }
//   const switchMode = () => {
//     setIsSignup((prevIsSignup) => !prevIsSignup)
//   }
//   const handleShowPassword = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword)
//     handleShowPassword(false)
//   }
//   const googleSuccess = async (res) => {
//     const result = await jwt_decode(res.credential);
//     const token = res.credential;

//     try {
//       dispatch({ type: AUTH, data: { result, token } });
//       history.push('/')

//     } catch (error) {
//       console.log(error);
//     }
//   };



//   // const getTokenInfo = async (res) => {
//   //     const JWT = await jwt_decode(res.credential)
//   //     return googleSuccess(JWT)
//   // }

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper className={classes.paper} elevation={3}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {isSignup && (
//               <>
//                 <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
//                 <Input name="lastName" label="Last Name" handleChange={handleChange} half />
//               </>
//             )}
//             <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
//             <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
//             {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
//           </Grid>
//           <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
//             {isSignup ? 'Sign Up' : 'Sign In'}
//           </Button>

//           <GoogleOAuthProvider clientId="971085984731-uhu6cfn2vrunte4h6fbca59obm20fm5l.apps.googleusercontent.com" justifyContent='center'>
//             <GoogleLogin
//               onSuccess={credentialResponse => {

//                 googleSuccess(credentialResponse)

//               }}

//               shape="rectangle"
//               width='360'
//               onError={() => {
//                 alert('Google Sign In was unsuccessful. Try again later')
//               }}
//               useOneTap
//             />
//           </GoogleOAuthProvider>
//           <Grid container justifyContent='center'>
//             <Grid item >
//               <Button onClick={switchMode}>
//                 {isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   )
// }

// export default Auth