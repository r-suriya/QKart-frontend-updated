import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import "./Header.css";

import {Link} from "react-router-dom";
import { WindowSharp } from "@mui/icons-material";

import {TextField,} from "@mui/material";

const Header = ({ children, hasHiddenAuthButtons }) => {

const [isLoggedOut, setIsLoggedOut] = useState(false);

if(isLoggedOut){
localStorage.clear();
window.location.reload();}

  if(hasHiddenAuthButtons)
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Link style={{textDecoration: 'none'}} to={"/"}>
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
        >
          Back to explore
        </Button>
        </Link>
      </Box>
    );
    //for logged in product page
    else if(localStorage.getItem("username") && !isLoggedOut)
      return (
      <Box className="header">
        <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        <Stack direction={"row"} spacing={2}>
            <img src="avatar.png" alt={localStorage.getItem('username')} />
            <div>{localStorage.getItem("username")}</div>
          
        {/* </Box> */}
        <Link style={{textDecoration: 'none'}} to={"/"}>
        <Button className="button" variant="contained" onClick={()=>{setIsLoggedOut(true)}}>
            Logout
        </Button> 
        </Link>
        </Stack> 
      </Box>
      )
    
    //for initial product page
    else
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        <Stack direction={"row"} spacing={2}>
        <Link style={{textDecoration: 'none'}} to={"/login"}>
          <Button className="button" variant="contained">
            Login
           </Button>
           </Link>
           <Link style={{textDecoration: 'none'}} to={"/register"}>
        <Button className="button" variant="contained">
            Register
           </Button>
           </Link>
          </Stack>
      </Box>
    )
};

export default Header;
