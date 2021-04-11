import React from 'react';
import { Accordion, AccordionSummary, Box, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import DishComponent from './DishComponent';
import OrderSummary from './OrderSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ListView({Dishes,Categories,search,filteredCategories,checkedVeg}){

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

    function getDishesVeg(category){
        const lst = [];
        for(var i = 0 ; i< Dishes.length ; i++){
            if(
                Dishes[i].tags[0].includes("Veg") &&
                Dishes[i].Category === category && 
                Dishes[i].DishName.indexOf(search) > -1 
                ){
                lst.push(
                    <Box style={{marginLeft:20}}>
                    <DishComponent
                        name = {Dishes[i].DishName}
                        price = {Dishes[i].Price}
                        tags = {Dishes[i].tags[0]}
                        desc = {Dishes[i].Description}
                        ImageUrl={Dishes[i].ImageUrl ? Dishes[i].ImageUrl : null}
                        handleAddFunc = {handleAddFunc}
                        id={i}
                        cart={orderCart}
                    />
                    <Divider style={{marginBottom:10}}/>
                    </Box>
                );
            }
        }
        return lst;
    }

    function getDishes(category){

        const lst = [];
        for(var i = 0 ; i< Dishes.length ; i++){
            if(
                Dishes[i].Category === category && 
                Dishes[i].DishName.indexOf(search) > -1 
                ){
                lst.push(
                    <Box style={{marginLeft:20}}>
                    <DishComponent
                        name = {Dishes[i].DishName}
                        price = {Dishes[i].Price}
                        tags = {Dishes[i].tags[0]}
                        desc = {Dishes[i].Description}
                        ImageUrl={Dishes[i].ImageUrl ? Dishes[i].ImageUrl : null}
                        handleAddFunc = {handleAddFunc}
                        id={i}
                        cart={orderCart}
                    />
                    <Divider style={{marginBottom:10}}/>
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
        <Box style={{marginTop:10}}>
            {getUniqueCategories().map((category)=>(
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography>{category}</Typography>
                </AccordionSummary>
                {checkedVeg ? getDishesVeg(category) : getDishes(category)}
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
    Dishes : state.auth.user.dishes,
    Categories : state.auth.user.Categories
});

export default connect(mapStateToProps,{})(ListView);