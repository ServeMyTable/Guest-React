import React from 'react';
import { Accordion, AccordionSummary, Box, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import DishComponent from '../components/DishComponent';
import OrderSummary from './OrderSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ListView({Dishes,Categories,search,filteredCategories}){

    const [orderCart,setCart] = React.useState([]);

    function handleAddFunc(order){
        
        if(orderCart.length <= 0){
            setCart([order]);
        }else{
            
            var temp = 0;
            for(var i = 0 ; i < orderCart.length ; i++){
                temp++;
                if(orderCart[i].name === order.name){
                    orderCart[i].units = order.units
                    setCart([...orderCart]);
                    temp=0;
                    break;
                }
            }
            if(temp === orderCart.length){
                setCart([...orderCart,order]);
            }
            
        }
        //console.log(orderCart);
    }

    function getFilterCart(){
        const tempCart = [];
        for(var i = 0 ; i < orderCart.length ; i++){
            if(orderCart[i].units !== 0){
                tempCart.push(orderCart[i]);
            }
        }
        return tempCart;
    }

    function getUniqueCategories(){
        
        if(filteredCategories.length <= 0){
            if(search !== ''){
                const newCategories = [];
                for(var i = 0 ; i< Dishes.length ; i++){
                    Dishes[i].DishName.indexOf(search) > -1 &&
                    newCategories.push(Dishes[i].Category);
                }
                return newCategories.filter(function(item,pos){return newCategories.indexOf(item) === pos;});
            }
            if(Categories !== null && Categories !== undefined){
                return Categories.filter(function(item, pos){return Categories.indexOf(item) === pos;});
            }
        }else{
            return filteredCategories;
        }
    }

    function getDishes(category){
        const lst = [];
        for(var i = 0 ; i< Dishes.length ; i++){
            if(Dishes[i].Category === category){
                Dishes[i].DishName.indexOf(search) > -1 &&
                lst.push(
                    <Box style={{marginLeft:20}}>
                    <DishComponent
                        name = {Dishes[i].DishName}
                        price = {Dishes[i].Price}
                        tags = {Dishes[i].tags}
                        desc = {Dishes[i].Description}
                        handleAddFunc = {handleAddFunc}
                        id={i}
                        cart={orderCart}
                    />
                    </Box>
                );
            }
        }
        return lst;
    }
    if(getUniqueCategories().length <= 0){
        return(
        <Box style={{textAlign:"center"}}>
            <Typography>No Dish Available</Typography>
        </Box>
        );
    }else{
    return(
        <Box>
            {getUniqueCategories().map((category)=>(
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography>{category}</Typography>
                </AccordionSummary>
                {getDishes(category)}
            </Accordion>
            ))}
            <Box>
                <OrderSummary cart={getFilterCart()}/>
            </Box>
        </Box>
    );
    }
}

const mapStateToProps = state =>({
    Dishes : state.parcel.RestaurantDetails.Dishes,
    Categories : state.parcel.RestaurantDetails.Categories
});

export default connect(mapStateToProps,{})(ListView);