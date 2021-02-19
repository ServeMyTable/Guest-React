import React from 'react';
import { Avatar, Box, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Redirect } from 'react-router-dom';
import Logo from '../assets/logo.png';
import PropTypes from 'prop-types';

function Check(props){
    
    function getValues(){

        const parameters = (props.location.search).toString();
        if((parameters.split("&")[0]).split("=")[1] !== undefined){
            const id = (parameters.split("&")[0]).split("=")[1];
            const table = (parameters.split("&")[1]).split("=")[1];
            const data = {
                id : id,
                table : table
            };
            props.login(data);
        }
    }
    if(props.auth.isAuthenticated){
        return <Redirect to="/restaurant"/>  
    }
    getValues();
    return(
    <Box>
        <Box
            display="flex"
            justifyContent="center" 
            alignItems ="center"
            flexDirection="column"
            style={{marginTop:"20%"}}
            >
            <Avatar src={Logo} variant="rounded" style={{height:80,width:100}}/>
            <LinearProgress color="primary" style={{width:120, marginTop: 10}}/>
        </Box>
    </Box>
    )
}

Check.propTypes = {
    login : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth : state.auth
});

export default connect(mapStateToProps,{login})(Check);