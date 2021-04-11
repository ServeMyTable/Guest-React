import React from 'react';

import { 
    Box, TextField, Typography, Avatar,
    Button, AppBar, IconButton, Toolbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import TokenFinal from './TokenFinal';
import Logo from '../assets/logo.png';
import { connect } from 'react-redux';
import { createToken } from '../actions/token';
import { getWaitingList } from '../actions/tokenList';

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
    TokenHeadingBox:{
        marginTop:30,
        marginLeft:10,
        marginBottom:30,
    },
    Form:{
        marginLeft:10,
        marginRight:10,
        marginTop:10
    },
    Table:{
        margin:10
    },
    TableRow:{
        textAlign:'center',
        fontFamily:'Noto Sans, sans-serif',
        verticalAlign:'center',
    },
    BookedBox:{
        background:'#9ede73',
        padding:5,
        border:'1px solid #9ede73',
        borderRadius:'5px',
        fontFamily:'Noto Sans, sans-serif',
        textAlign:'center'
    },
    CalledBox:{
        background:'#FFD31D',
        padding:5,
        border:'1px solid #FFD31D',
        borderRadius:'5px',
        fontFamily:'Noto Sans, sans-serif',
        textAlign:'center'
    }
    
}));

function Token(props) {

    const classes = useStyles();

    const [disable,setDisable] = React.useState(false);
    const [formData,setData] = React.useState({
        CustomerName:null,
        PhoneNo : null,
        NoOfPeople : null
    });

    const [waitData,setWData] = React.useState({
        PhoneNo : null
    });

    function getValues(){
        
        const parameters = props.location.search;
        if(parameters.split("=")[1] !== undefined){
            setData({...formData,PhoneNo:parameters.split("=")[1]});
            setDisable(true);
        }
    }
    React.useEffect(()=>{ getValues(); },[]);

    function handleSubmit(e){
        e.preventDefault();
        props.createToken({
            Phone : formData.PhoneNo,
            CustomerName : formData.CustomerName,
            NoOfPersons : formData.NoOfPeople
        });
    }
    
    function handleWaitSubmit(e){
        e.preventDefault();
        props.getWaitingList({Phone:waitData.PhoneNo});
    }

    function NavBar(){
        return(
            <AppBar position="static" style={{backgroundColor:"#FFF"}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Avatar src={Logo} variant="rounded" style={{width:50}}></Avatar>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    Serve My Table
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }

    function WaitingList(){

        React.useEffect(()=>{
            setTimeout(()=>{
                props.getWaitingList({Phone:waitData.PhoneNo});
            },5000);
        },[]);

        return(
            <Box>
                <NavBar/>
                <Box className={classes.TokenHeadingBox}>
                    <Typography className="logoFont" variant="h4" component="h6">Waiting List</Typography>
                </Box>
                <Box className={classes.Table}>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className='logoFont' style={{textAlign:'center'}}>#</th>
                            <th scope="col" className='logoFont' style={{textAlign:'center'}}>Token No</th>
                            <th scope="col" className='logoFont' style={{textAlign:'center'}}>Name</th>
                            <th scope="col" className='logoFont' style={{textAlign:'center'}}>No of Members</th>
                            <th scope="col" className='logoFont' style={{textAlign:'center'}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.tokenList.map((token,index)=>(
                                <tr>
                                    <th scope="row" className={classes.TableRow}>{index+1}</th>
                                    <td className={classes.TableRow}>{token.tokenNo}</td>
                                    <td className={classes.TableRow}>{token.Name}</td>
                                    <td className={classes.TableRow}>{token.NoOfPersons}</td>
                                    <td>
                                        <Box className={token.Status === 'Booked' ? classes.BookedBox : classes.CalledBox}>
                                            {token.Status}
                                        </Box>
                                        
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </Box>
            </Box>
        
        );
    }

    if(props.tokenList.length > 0){
        return( <WaitingList/> );
    }else
    if(props.token.tokenNo !== null && props.token.TokenDetails !== null)
    {
        return (
            <TokenFinal 
                RestaurantID={props.token.Restaurant.Phone} 
                CustomerName={props.token.TokenDetails.CustomerName}
                NoOfPeople={props.token.TokenDetails.NoOfPeople}
                tNo={props.token.tokenNo}
            />
        )
    }else{
    return (
        <Box>
            <NavBar/>
            {
                props.errorHandler.errorStatus &&
                <Alert severity={props.errorHandler.errorType}>
                    {props.errorHandler.errorMsg}
                </Alert>
            }
            <Box className={classes.TokenHeadingBox}>
                <Typography className="logoFont" variant="h4" component="h6">Token</Typography>
                <Typography className="mFont" variant="h6" component="h6" color="textSecondary">
                    Now no need to wait in line.
                </Typography>
            </Box>
            <form onSubmit={handleSubmit} className={classes.Form}>
                <TextField
                    variant="outlined" 
                    className="loginInput mFont" 
                    name="CustomerName" type="text" 
                    placeholder="Enter your Name " 
                    onChange={(e)=>setData({...formData,CustomerName : e.target.value})}
                    value={formData.CustomerName}
                    required
                    fullWidth
                    />

                <TextField
                    variant="outlined" 
                    className="loginInput mFont" 
                    name="RestaurantID" type="text" 
                    placeholder="Enter Restaurant Phone No." 
                    onChange={(e)=>setData({...formData,PhoneNo : e.target.value})}
                    value={formData.PhoneNo}
                    disabled={disable}
                    style={{marginTop:10}}
                    required
                    fullWidth
                    />

                <TextField
                    variant="outlined" 
                    className="loginInput mFont" 
                    name="NoOfPeople" type="number" 
                    placeholder="Enter no. of people" 
                    onChange={(e)=>setData({...formData,NoOfPeople : e.target.value})}
                    value={formData.NoOfPeople}
                    style={{marginTop:10}}
                    required
                    fullWidth
                    />
                
                <Button 
                    className='mFont' 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    style={{marginTop:10}}
                    fullWidth>
                    Get Token
                </Button>
            </form>

            <Box className={classes.TokenHeadingBox}>
                <Typography className="logoFont" variant="h4" component="h6">Waiting List</Typography>
                <form className={classes.Form} onSubmit={handleWaitSubmit}>
                    <TextField
                        variant="outlined" 
                        className="loginInput mFont" 
                        name="RestaurantID" type="tel" 
                        placeholder="Enter Restaurant Phone No." 
                        onChange={(e)=>setWData({...waitData,PhoneNo : e.target.value})}
                        value={waitData.PhoneNo}
                        style={{marginTop:10}}
                        required
                        fullWidth
                    />
                    <Button 
                        className='mFont' 
                        type="submit" 
                        variant="outlined" 
                        color="primary" 
                        style={{marginTop:10}}
                        fullWidth>
                        Check Waiting List
                    </Button>
                </form>    
            </Box>
        </Box>
    );
    }
}

const mapStateToProps = state =>({
    token : state.token,
    errorHandler : state.errorHandler,
    tokenList : state.tokenList
});

export default connect(mapStateToProps,{createToken, getWaitingList})(Token);