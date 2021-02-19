import React from 'react';
import Logo from '../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Accordion, Grid, DialogContent,
    AccordionSummary, Dialog, Button,
    AppBar, Avatar, Box, Divider,TextField,
    IconButton, Toolbar, Typography, DialogTitle, DialogActions,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders } from '../actions/table';
import { Link, Redirect } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Axios from 'axios';
import { logout } from '../actions/auth';
import { setOrders } from '../actions/PreviousOrders';

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
    container:{
        padding:20,
    },
    bottomBox:{
        boxShadow:"0px 3px 6px rgba(0,0,0,16%)",
        padding:20,
        marginTop:10
    },
    buttonBox:{
        boxShadow:"0px 3px 6px rgba(0,0,0,16%)",
        padding:10,
        marginTop:10
    },
    checkoutBtn:{
        borderColor:"#FFD31D",
        border: "1px solid",
    }
}));

function FinalPage({getOrders,table,user,logout,previousOrders,setOrders}){
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(3);
    const [feedback,setfeedback] = React.useState('');

    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    
    function handleSubmit(){
        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }
        const body={
            feedback:feedback,
            stars:value,
            Name:table[0].CustomerName,
            RestaurantID:table[0].RestaurantID
        };
        Axios.post("/api/feedback/",body,config)
        .then((response)=>{
            leaveRestaurant();
        }).catch((err)=>{console.log(err); leaveRestaurant();});
    }

    function leaveRestaurant(){
        logout();
        <Redirect to="/"/>
    }

    function getTotalBill(){
        var totalBill = 0.0;
        for(var i = 0 ; i < previousOrders.length;i++){
            totalBill = totalBill + parseFloat(previousOrders[i].TotalBill);
        }
        return totalBill;
    }

    function getSubTotal(){
        var subTotal = 0.0;
        for(var i = 0 ; i < previousOrders.length;i++){
            subTotal = subTotal + parseFloat(previousOrders[i].SubTotal);
        }
        return subTotal;
    }

    function getTotalCharges(){
        const Charges = user.Taxes;
        if(Charges.length > 0){
            var totalCharges = 0.0;
            const SubTotal = getSubTotal();
            for(var i = 0 ; i< Charges.length ; i++){
                if(Charges[i].TaxType === "Percentage"){
                    totalCharges += (SubTotal * (Number.parseFloat(Charges[i].Amount))/100);
                }
                if(Charges[i].TaxType === "Fixed"){
                    totalCharges += Number.parseFloat(Charges[i].Amount);
                }
            }
            return totalCharges;
        }else{
            return 0.0;
        }
    }

    if(table.length > previousOrders.length){
        setOrders({allOrders : table});
    }
    getOrders();

    return(
        <Box>
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
            <Box className={classes.container}>
                <Box>
                    <Typography variant="h6">Hello!</Typography>
                    <Typography color="textSecondary">Table No.{ user.TableNo }</Typography>
                    <Typography variant="h6" style={{marginTop:20}}>{ user.name }</Typography>
                    <Typography color="textSecondary">{ user.location }</Typography>
                </Box>
                <Divider style={{marginTop:10,marginBottom:10}}/>
                <Box>
                    {previousOrders.map((eachtable)=>(
                        <Box>
                            <Accordion>
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon/>}
                                    >
                                    <Typography>Total Items :  
                                    {   eachtable.Orders &&
                                        (eachtable.Orders.length)
                                    }
                                    </Typography>
                                </AccordionSummary>
                                <Box style={{padding:20}}>
                                {
                                    eachtable.Orders.map((order)=>(
                                        <Grid container>
                                            <Grid item sm={8} xs={8}>
                                                <Typography>{order.DishName}</Typography>
                                                <Typography color="textSecondary">{order.Quantity} x {order.Rate}</Typography>
                                            </Grid>
                                            <Grid item sm={4} xs={4}>
                                                <Box textAlign="right">
                                                <Typography>{parseFloat(order.Quantity) * parseFloat(order.Rate)}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                                </Box>
                            </Accordion>
                        </Box>
                    ))}
                </Box>
                <Box className={classes.bottomBox}>
                    <Grid container>
                        <Grid item sm={8} xs={8}>
                            <Typography>Sub Total</Typography>
                            <Typography>Taxes & Charges</Typography>
                        </Grid>
                        <Grid item sm={4} xs={4}>
                            <Box textAlign="right">
                                <Typography>{getSubTotal()}</Typography>
                                <Typography>{getTotalCharges()}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomBox}>
                    <Grid container>
                        <Grid item sm={8} xs={8}>
                            <Typography>Total</Typography>
                        </Grid>
                        <Grid item sm={4} xs={4}>
                            <Box textAlign="right">
                                <Typography> <strong> {getTotalBill()} </strong></Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Link to="/restaurant" style={{color:"#000000",textDecoration:"none"}}>
                
                <Box 
                    textAlign="center" 
                    className={classes.buttonBox} 
                    style={{backgroundColor:"#FFD31D"}}>
                    
                    <Typography>ORDER MORE</Typography>

                </Box>
                </Link>

                <Box
                    textAlign="center"
                    className={[classes.buttonBox,classes.checkoutBtn]}
                    onClick={handleClickOpen}
                >
                    <Typography>EXIT RESTAURANT</Typography>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Review and Feedback</DialogTitle>
                    <DialogContent>
                        <Typography style={{letterSpacing:2,marginTop:5}}>RATINGS</Typography>
                        <Box style={{marginTop:10}} textAlign="center">
                            <Rating
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>
                        <Typography style={{letterSpacing:2,marginTop:5}}>FEEDBACK</Typography>
                        <Box style={{marginTop:10}}>
                            <TextField
                                variant="outlined"
                                placeholder="Feedback"
                                onChange={(e)=>{setfeedback(e.target.value)}}
                                fullWidth
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={()=>{leaveRestaurant()}}>Exit</Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Review and Exit</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            
        </Box>
    );
}

FinalPage.propTypes = {
    table : PropTypes.array.isRequired,
    user : PropTypes.object.isRequired,
    getOrders : PropTypes.func.isRequired,
    logout : PropTypes.func.isRequired,
    setOrders : PropTypes.func.isRequired
};

const mapStateToProps = state=>({
    table : state.table,
    previousOrders : state.previousOrders,
    user : state.auth.user
});

export default connect(mapStateToProps,{getOrders,logout,setOrders})(FinalPage);