import React from 'react';
import { 
    Box, AppBar, Toolbar, IconButton, Avatar, Typography, Divider
} from '@material-ui/core';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Logo from '../assets/logo.png';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
        color:'black'
    },
    rName:{
        width:100,
        height:100,
        backgroundColor:"#FFD31D",
        fontSize:50,
        color:'#000'
    },
}));

function TokenFinal(props) {

    const classes = useStyles();

    return (
        <Box>
            <AppBar position="static" style={{backgroundColor:"#FFF"}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Avatar src={Logo} variant="rounded" style={{width:50}}/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    Serve My Table
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box marginLeft={5} marginRight={5} marginTop={5}>
                <Box display="flex" justifyContent='center' alignSelf='center'> 
                    {
                        props.token.Restaurant.RestaurantImage ?
                        <Avatar src={props.token.Restaurant.RestaurantImage} variant="circle" style={{width:50}}/>
                        :
                        <Avatar className={classes.rName}>{(props.token.Restaurant.UserName)[0]}</Avatar>
                    }
                </Box>
                <Box textAlign="center" marginTop={3}>
                    <Typography variant="h6" component="h6">{props.token.Restaurant.RestaurantName}</Typography>
                </Box>
                <Divider style={{marginTop:10}}/>
                <Box textAlign="center" marginTop={3}>
                    <Typography variant="h6" component="h6">Token No. {props.token.tokenNo}</Typography>
                    <Typography variant='h6' component='h6'>{props.CustomerName}</Typography>
                    <Typography variant='h6' component='h6'>No. of Person: {props.NoOfPeople}</Typography>
                </Box>
                <Box marginTop={3} textAlign='center' display="flex" flexDirection='row' justifyContent='center'>
                    <Box textAlign='center'>
                        <CheckCircleIcon style={{width:50,height:50,color:"#05f29b"}}/>
                        <Typography>Token Booked</Typography>
                    </Box>
                    <Box textAlign='center' marginLeft={3}>
                        {props.token.Status === 'Called' ? 
                            <CheckCircleIcon style={{width:50,height:50,color:"#05f29b"}}/>
                            :
                            <MoreHorizIcon style={{width:50,height:50}}/>
                        }
                        <Typography>Restaurant Called You</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const mapStateToProps = state =>({
    token : state.token    
});

export default connect(mapStateToProps,{ })(TokenFinal);