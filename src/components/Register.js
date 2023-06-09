import { circularProgressClasses } from "@mui/material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link, Redirect } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */

  const [userInformation, setUserInformation] = useState({username: "", password: "", confirmPassword: ""});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const register = async (formData) => {
    //console.log(formData);

    setLoading(true);
    
    try{

      switch(validateInput(formData)){
        case 0:
          enqueueSnackbar("Username is a required field",{variant: "error"});
          break;
        case 1:
          enqueueSnackbar("Username must be at least 6 characters", {variant:"error"});
          break;
        case 2:
          enqueueSnackbar("Password is a required field", {variant: "error"});
          break;
        case 3:
          enqueueSnackbar("Password must be at least 6 characters", {variant: "error"});
          break;
          case 4:
            enqueueSnackbar("Password do not match", {variant: "error"});
            break;
          case 5:
            var res = await axios.post(`${config.endpoint}/auth/register`, {username: formData.username, password: formData.password});
            if(res.status === 201)
            enqueueSnackbar("Registered successfully", {variant:"success"});//use then here
            history.push('/login');
            break;
          default:
            break;


      }

      setLoading(false);
      /* if(validateInput(formData) === 5){
        let res = await axios.post(`${config.endpoint}/auth/register`, {username: formData.username, password: formData.password});
      if(res.status === 201)
      enqueueSnackbar("Registered successfully", {variant:"success"});
      setLoading(false); */

      }
      /* else{
  
      } */
    //}
    catch(error){
      
      if (error.response.status === 400)
      enqueueSnackbar(error.response.data.message, {variant:"error"});
      else
      enqueueSnackbar("Something went wrong.Check that the backend is running, reachable and returns valid JSON.",{variant: "error"});
      setLoading(false);
    }

    
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {


    if(data.username.length === 0)
    return 0;
    
    if(data.username.length < 6)
    return 1;

    if(data.password.length === 0)
    return 2;

    if(data.password.length < 6)
    return 3;

    if(data.password !== data.confirmPassword)
    return 4;

    return 5;
    

    

/*     if(data.password.length === 0)
    enqueueSnackbar("Password is a required field")
    else{
      if(data.password.length === 0)
      enqueueSnackbar("Username is a required field",{variant: "error"});
    else{
      if(data.username.length < 6)
      enqueueSnackbar("Password must be at least 8 characters", {variant: "error"});
    else
    {
      if(data.password !== data.confirmPassword )
      enqueueSnackbar("Passwords do not match.", {variant: "error"});
    }

    }

    } */
    
  };
  
  
    if(loading === true)
    var button =<CircularProgress style={{margin:"auto"}}/>
    else
    var button = <Button className="button" variant="contained" onClick={()=>register(userInformation)}>
    Register Now
   </Button>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(event)=>setUserInformation({...userInformation, username: event.target.value})}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(event)=>setUserInformation({...userInformation, password: event.target.value})}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={(event)=>setUserInformation({...userInformation, confirmPassword: event.target.value})}
          />
           {/* <Button className="button" variant="contained" onClick={()=>register(userInformation)}>
            Register Now
           </Button> */}
           {button}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link style={{textDecoration: 'none'}} to={"/login"}>
             <a className="link">
              Login here
             </a>
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
  
};

export default Register;
