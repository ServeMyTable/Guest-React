import React from 'react';

import Logo from '../assets/logo.png';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';

import { 
    Box, AppBar, Toolbar, Button, TextField,
    IconButton, Avatar, Typography 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Restaurant from './ParcelElements/Restaurant';
import { setAlert } from '../actions/errorHandler';
import { setCustomerDetails } from '../actions/parcel';
import Axios from 'axios';

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
    HeadingBox:{
        marginTop:30,
        marginLeft:10,
        marginBottom:30,
    },
    SelectedBtn:{
        padding:10,
        textAlign:'center',
        fontFamily : 'Noto Sans',
        backgroundColor : '#FFD31D',
        border:'1px solid #FFD31D',
        width:150
    },
    NotSelectedBtn:{
        padding:10,
        textAlign:'center',
        fontFamily : 'Noto Sans',
        backgroundColor : '#FFF',
        border:'1px solid #FFD31D',
        width:150
    },
    Form:{
        marginLeft:10,
        marginRight:10,
        marginTop:10
    },
    Btn:{
        marginTop:10,
        padding:10,
        textAlign:'center',
    }

}));

function Parcel(props) {

    const classes = useStyles();
    
    const [takeaway,setTakeaway] = React.useState(true);
    const handleClick = () =>{ setTakeaway(!takeaway); };
    const [Details,setDetails] = React.useState(null);

    const [inResto,setResto] = React.useState(false);

    async function handleSubmit(EnteredDetails){
        try{
            const resp = await isValid(EnteredDetails.RestaurantID);
            if(resp){
                setDetails(EnteredDetails);
                props.setCustomerDetails({Details:EnteredDetails});
                setResto(true);
            }else{
                props.setAlert('error','Invalid Restaurant Phone Number',true);
            }
        }catch(error){
            props.setAlert('error','Some Error Occured',true);
        }
    }

    async function isValid(Phone){
        var boolV;
        try {
            const body = JSON.stringify({RestaurantID:Phone});
            const config = {
                headers:{
                    'content-type':'application/json'
                }
            };
            const response = await Axios.post('/api/parcel/valid',body,config);
            boolV = response.data;
        } catch (error) {
            props.setAlert('error','Some Error Occured',true);
            boolV = false;
        }
        return boolV;
    }

    function TakeAwayForm(){
        const [basicDetails,setDetails] = React.useState({
            Name:null,
            Phone:null,
            CustomerPhone:null,
        });
        const [disable,setDisable] = React.useState(false); 
        function getValues(){
        
            const parameters = props.location.search;
            if(parameters.split("=")[1] !== undefined){
                setDetails({...basicDetails,Phone:parameters.split("=")[1]});
                setDisable(true);
            }
        }
        React.useEffect(()=>{ getValues(); },[]);
        return(
            <form className={classes.Form} 
                onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit({
                        CustomerName:basicDetails.Name,
                        RestaurantID:basicDetails.Phone,
                        DeliveryAddress:'',
                        OrderType:'Takeaway',
                        CustomerPhone:basicDetails.CustomerPhone
                    });
                }
                }>
                <TextField
                    className="loginInput mFont" 
                    type='text'
                    placeholder='Enter your Name'
                    variant='outlined'
                    style={{marginTop:10}}
                    onChange={(e)=>setDetails({...basicDetails,Name:e.target.value})}
                    value={basicDetails.Name}
                    required
                    fullWidth
                />
                <TextField
                    className="loginInput mFont" 
                    type='number'
                    placeholder='Enter Restaurant No.'
                    variant='outlined'
                    style={{marginTop:10}}
                    onChange={(e)=>setDetails({...basicDetails,Phone:e.target.value})}
                    value={basicDetails.Phone}
                    disabled={disable}
                    required
                    fullWidth
                />
                <TextField
                    className="loginInput mFont" 
                    type='number'
                    placeholder='Enter Contact No.'
                    variant='outlined'
                    style={{marginTop:10}}
                    onChange={(e)=>setDetails({...basicDetails,CustomerPhone:e.target.value})}
                    value={basicDetails.CustomerPhone}
                    required
                    fullWidth
                />
                <Button type='submit' variant='contained' color='primary' className={classes.Btn} fullWidth>Proceed</Button>
            </form>
        );
    }

    function DeliveryForm(){
        const [basicDetails,setDetails] = React.useState({
            Name:null,
            Phone:null,
            CustomerPhone:null,
        });
        const [address,setAddress] = React.useState(null);
        const [disable,setDisable] = React.useState(false); 
        function getValues(){
        
            const parameters = props.location.search;
            if(parameters.split("=")[1] !== undefined){
                setDetails({...basicDetails,Phone:parameters.split("=")[1]});
                setDisable(true);
            }
        }
        React.useEffect(()=>{ getValues(); },[]);
        return(
            <form className={classes.Form}
                onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit({
                        CustomerName:basicDetails.Name,
                        RestaurantID:basicDetails.Phone,
                        DeliveryAddress:address,
                        OrderType:'Delivery',
                        CustomerPhone:basicDetails.CustomerPhone
                    });
                }
                }>
                <TextField
                    className="loginInput mFont" 
                    type='text'
                    placeholder='Enter your Name'
                    variant='outlined'
                    style={{marginTop:10}}
                    onChange={(e)=>setDetails({...basicDetails,Name:e.target.value})}
                    value={basicDetails.Name}
                    required
                    fullWidth
                />
                <TextField
                    className="loginInput mFont" 
                    type='number'
                    placeholder='Enter Restaurant No.'
                    variant='outlined'
                    style={{marginTop:10}}
                    disabled={disable}
                    onChange={(e)=>setDetails({...basicDetails,Phone:e.target.value})}
                    value={basicDetails.Phone}
                    required
                    fullWidth
                />
                <TextField
                    className="loginInput mFont" 
                    type='number'
                    placeholder='Enter Contact No.'
                    variant='outlined'
                    style={{marginTop:10}}
                    onChange={(e)=>setDetails({...basicDetails,CustomerPhone:e.target.value})}
                    value={basicDetails.CustomerPhone}
                    required
                    fullWidth
                />
                <TextField
                    className="loginInput mFont"
                    type='text'
                    variant='outlined'
                    style={{marginTop:10}}
                    placeholder='Address'
                    onChange={(e)=>setAddress(e.target.value)}
                    value={address}
                    required
                    fullWidth
                />
                <Button type='submit' variant='contained' color='primary' className={classes.Btn} fullWidth>Proceed</Button>
            </form>
        );
    }

    const NavBar = () =>(
        
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
    
    
    

    if(props.parcel.CustomerDetails !== null){
        return <Restaurant details={props.parcel.CustomerDetails}/>
    }else
    if(inResto){
        return <Restaurant details={Details}/>
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

            <Box className={classes.HeadingBox}>
                <Typography className="logoFont" variant="h4" component="h6">Delivery or Takeaway</Typography>
                <Typography className="mFont" variant="h6" component="h6" color="textSecondary">
                    Get Fast delivery. Don't wait in Line for ordering
                </Typography>
            </Box>
            <Box display='flex' flexDirection='row' marginLeft='10px' marginRight='10px'>
                <Button onClick={handleClick} className={takeaway ? classes.SelectedBtn : classes.NotSelectedBtn}>Takeaway</Button>
                <Button onClick={handleClick} className={!takeaway ? classes.SelectedBtn : classes.NotSelectedBtn}>Delivery</Button>
            </Box>
            {
                takeaway ? 
                <TakeAwayForm/> :
                <DeliveryForm/>
            }

        </Box>
    );
    }
}

const mapStateToProps = state =>({
    errorHandler : state.errorHandler,
    parcel : state.parcel
});

export default connect(mapStateToProps,{setCustomerDetails,setAlert})(Parcel);