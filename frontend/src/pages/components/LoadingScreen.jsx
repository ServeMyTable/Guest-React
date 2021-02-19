import React from 'react';

import { Box,Avatar,LinearProgress } from '@material-ui/core';
import Logo from '../../assets/logo.png';

function LoadingScreen(props) {
    return (
        <Box style={{width:"100%",height:"100%",backgroundColor:"white"}}>
            <Box style={{position:"absolute",top:"40%",left:"40%"}}>
                <Avatar src={Logo} variant="rounded" style={{width:50}}/>
                <LinearProgress style={{marginTop:10,width:50}}/>
            </Box>
        </Box>
    );
}

export default LoadingScreen;