import React from 'react';
import Logo from '../../assets/logo.png';

import { 
    Box, AppBar, Toolbar, IconButton, 
    Avatar, Typography, Grid 
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

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
        padding:10,
        marginTop:10
    },
    TotalBox:{
        padding:10,
        marginTop:20,
        backgroundColor:"#FFD31D",
        boxShadow:"0px 3px 6px #FFD31D16",
        marginBottom:10,
        border:'1px solid #FFD31D',
        borderRadius:5
    },
    orderTitle:{
        padding:10,
        marginTop:20,
        backgroundColor:"#FFD31D16",
        marginBottom:10,
        border:'1px solid #FFD31D',
        borderRadius:5
    }
    
}));


function Checkout({parcel}) {

    const classes = useStyles();
    
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

    function getTotalBill(){
        
        return parcel.OrderDetails.TotalBill;
    }

    function getSubTotal(){
        
        return parcel.OrderDetails.SubTotal;
    }

    function getTotalCharges(){
        const Charges = parcel.RestaurantDetails.Taxes;
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

    return (
        <Box>
            <NavBar/>
            <Box className={classes.container}>
                <Box>
                    <Typography variant="h6">Hello!</Typography>
                    <Typography variant="h6" style={{marginTop:20}}>{ parcel.CustomerDetails.CustomerName }</Typography>
                    <Typography color="textSecondary">{ parcel.CustomerDetails.OrderType }</Typography>
                    <Typography color="textSecondary">Order Id : { parcel.OrderDetails.OrderId }</Typography>
                </Box>
                <Box className={classes.orderTitle}>
                    <Grid container>
                        <Grid item sm={8} xs={8}>
                            <Typography>Particulars</Typography>
                        </Grid>
                        <Grid item sm={4} xs={4}>
                            <Typography style={{textAlign:'right'}}>Amount</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.bottomBox}>
                    {
                        parcel.OrderDetails.Orders.map((order)=>(
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
                <Box className={classes.bottomBox} style={{marginTop:10}}>
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
                <Box className={classes.TotalBox}>
                    <Grid container>
                        <Grid item sm={8} xs={8}>
                            <Typography >Total</Typography>
                        </Grid>
                        <Grid item sm={4} xs={4}>
                            <Box textAlign="right">
                                <Typography>Rs <strong> {getTotalBill()} </strong></Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {
                    parcel.CustomerDetails.DeliveryAddress !== "" &&
                    <Box className={classes.bottomBox} style={{marginTop:10}}>
                        <Typography>Delivery Address</Typography>
                        <Typography color='textSecondary' style={{marginTop:10,marginBottom:10}}>
                            {parcel.CustomerDetails.DeliveryAddress}
                        </Typography>
                    </Box>

                }
            </Box>
            

        </Box>
    );
}
const mapStateToProps = state => ({
    parcel : state.parcel,
});

export default connect(mapStateToProps,{})(Checkout);