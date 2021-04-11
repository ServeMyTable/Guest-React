import React from "react";
import { 
    Badge, Box, Button, 
    Typography, Grid, Divider,
    IconButton
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { placeOrder } from '../../actions/table';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { setLoading } from '../../actions/loading';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    orderSummaryBtn : { 
        position:'fixed',
        bottom:0,
        boxShadow:"3px 0 6px rgba(0,0,0,16%)",
        padding:10,
        backgroundColor:"#FFD31D"
    },
    mDivider :{
        height:5,
        width:30,
        marginTop:10,
        marginBottom:10,
        backgroundColor:"#FFD31D"
    },
    mGrid : {
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:"#FFD31D5F"
    },
    orderGrid : {
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5
    },
    bgPrimary : {
        backgroundColor:"#FFD31D",
        fontSize:18,
        marginTop:20,
        boxShadow:"0px 3px 6px rgba(0,0,0,0.16)",
        paddingLeft:100,
        paddingRight:100
    },
    OrderSummaryDetailsScreen:{
        position:'fixed',
        bottom:0,
        width:'100%',
        backgroundColor:'white',
        overflow:'hidden',
        overflowY:'hidden',
        borderTop:'1px solid #F0F0F0',
        paddingBottom:20
    },
    finalPageLink: {
        position:"fixed",
        bottom:50,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"rgb(255,255,255)",
        width:"100%",
        boxShadow:"3px 0px 6px rgba(0,0,0,16%)"
    }
}));

function OrderSummary({cart,user,placeOrder,orderPlaced,setLoading,table,previousOrders}){
    
    const classes = useStyles();

    const [toggle,setToggle] = React.useState(false);

    const openToggle = () => setToggle(true);
    const closeToggle = () => setToggle(false);

    function getSubtotal(){
        var SubTotal = 0.0;
        for(var i = 0 ; i < cart.length ; i++){
            SubTotal += (cart[i].price * cart[i].units);
        }
        return SubTotal
    }

    function getTotalCharges(){
        var Charges = [];
        if(user.Taxes !== null || user.Taxes !== undefined){
           Charges = user.Taxes; 
        }
        if(Charges.length > 0){
            var totalCharges = 0.0;
            const SubTotal = getSubtotal();
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

    function handleOrderSubmit(){
        //Order Success
        const data = {
            Dish : cart,
            CustomerName : user.CustomerName !== null && user.CustomerName !== undefined ? user.CustomerName : '',
            TableNo : user.TableNo,
            TotalBill : (getSubtotal() + getTotalCharges()),
            notes : '',
            id : user.Phone,
            SubTotal:getSubtotal(),
            PaymentMode:"Cash"
        };
        setLoading();
        placeOrder(data);
    }

    if(orderPlaced){ return <Redirect to="/Checkout"/> }
    
    function bodyOfSummary(){
        return(
            <Box style={{marginTop:5}}>
                <Grid container className={classes.mGrid}>
                    <Grid item sm={5} xs={5} className="mFont">
                        Dish Name
                    </Grid>
                    <Grid item sm={2} xs={2} className="mFont">
                        Qty.
                    </Grid>
                    <Grid item sm={5} xs={5} className="mFont">
                        Price
                    </Grid>
                </Grid>
                <br/>
                {cart.map((order)=>{
                    if(order.units !== 0){
                    return(
                        <Grid container className={classes.orderGrid}> 
                            <Grid item sm={5} xs={5} className="mFont">
                                {order.name}
                            </Grid>
                            <Grid item sm={2} xs={2} className="mFont">
                                x{order.units}
                            </Grid>
                            <Grid item sm={5} xs={5} className="mFont">
                                {order.units * order.price}
                            </Grid>
                        </Grid>
                        );
                    }
                    else{
                        return(<div></div>);
                    }
                })}
                <Divider/>
                <Box className={classes.orderGrid}>
                <Grid container>
                    <Grid item sm={3} xs={3}></Grid>
                    <Grid item sm={4} xs={4}><Typography className="mFont">Sub Total</Typography></Grid>
                    <Grid item sm={5} xs={5}><Typography className="mFont">{getSubtotal()}</Typography></Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={3} xs={3}></Grid>
                    <Grid item sm={4} xs={4}><Typography className="mFont">Taxes & Charges</Typography></Grid>
                    <Grid item sm={5} xs={5}><Typography className="mFont">{getTotalCharges()}</Typography></Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={3} xs={3}></Grid>
                    <Grid item sm={4} xs={4}><Typography className="mFont">Total</Typography></Grid>
                    <Grid item sm={5} xs={5}><Typography className="mFont"><strong> {getSubtotal()+getTotalCharges()} </strong></Typography></Grid>
                </Grid>
                </Box>
                { getSubtotal() > 0 &&
                
                <Box display='flex' flexDirection='row' justifyContent='center' alignContent='center'>
                    <Button onClick={handleOrderSubmit} className={classes.bgPrimary}>Place Order</Button>
                </Box>
                }
            </Box>
        );
    }

    if(toggle){
        return(
            <Box className={classes.OrderSummaryDetailsScreen}>

                <Box display='flex' flexDirection='row'>
                    <IconButton onClick={closeToggle}>
                        <CloseIcon style={{color:'black'}}/>
                    </IconButton>
                    <Typography variant="h6" style={{color:'black',marginTop:8}}>Order Summary</Typography>
                </Box>
                
                {bodyOfSummary()}
            </Box>
        );
    }else{
        return(
            <Box>
                {
                    (table.length > 0 || previousOrders.length > 0) &&
                    <Grid container className={classes.finalPageLink}>
                        <Grid item xs={8} sm={8}>
                            <Typography 
                            style={{ fontSize:"small" }}
                            >Checkout Placed Orders</Typography>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <Box textAlign="right">
                                <Link to="/Checkout" style={{color:"#000000",textDecoration:"none"}}>
                                    <Typography style={{fontSize:"small"}}>VIEW MORE</Typography>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                    
                }

                <Button className={classes.orderSummaryBtn} onClick={openToggle} fullWidth
                disabled={cart.length > 0 ? false : true}
                >
                    <Badge badgeContent={cart.length} color="secondary">
                        <Typography variant="h6">Order Summary</Typography>
                    </Badge>
                </Button>
            </Box>
        );
    }
}

OrderSummary.propTypes = {
    user : PropTypes.object.isRequired,
    placeOrder : PropTypes.func.isRequired,
    orderPlaced : PropTypes.bool.isRequired,
    setLoading : PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    user : state.auth.user,
    orderPlaced : state.orderPlaced,
    table : state.table,
    previousOrders : state.previousOrders
});

export default connect(mapStateToProps,{ placeOrder, setLoading })(OrderSummary);