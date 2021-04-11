import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Box, Tabs, Tab, Typography, Divider } from '@material-ui/core';
import DishComponent from './DishComponent';
import OrderSummary from './OrderSummary';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function SliderView({Dishes,Categories,search,filteredCategories,checkedVeg}){

    const [value, setValue] = React.useState(0);
    const [orderCart,setCart] = React.useState([]);

    const theme = useTheme();
    const handleChange = (event, newValue) => { setValue(newValue); };
    const handleChangeIndex = (index) => { setValue(index); };

    function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

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

    function allTabs(){
        const lst = [];
        const UniqueCategories = getUniqueCategories();

        for(var i=0 ; i < UniqueCategories.length ; i++){
            lst.push(<Tab key={UniqueCategories[i]} label={UniqueCategories[i]} {...a11yProps(i)} />);
        }
        return lst;
    }

    function supportVeg(category){
        const lst = [];
        for(var i = 0 ; i< Dishes.length ; i++){

            if(
                Dishes[i].tags[0].includes("Veg") &&
                Dishes[i].Category === category && 
                Dishes[i].DishName.indexOf(search) > -1
                ){
                lst.push(
                    <Box>
                        <DishComponent
                            name = {Dishes[i].DishName}
                            price = {Dishes[i].Price}
                            tags = {Dishes[i].tags[0]}
                            ImageUrl={Dishes[i].ImageUrl ? Dishes[i].ImageUrl : null}
                            desc = {Dishes[i].Description}
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

    function support(category){
        
        const lst = [];
        for(var i = 0 ; i< Dishes.length ; i++){

            if(
                Dishes[i].Category === category && 
                Dishes[i].DishName.indexOf(search) > -1
                ){
                lst.push(
                    <Box>
                        <DishComponent
                            name = {Dishes[i].DishName}
                            price = {Dishes[i].Price}
                            tags = {Dishes[i].tags[0]}
                            ImageUrl={Dishes[i].ImageUrl ? Dishes[i].ImageUrl : null}
                            desc = {Dishes[i].Description}
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

    function allPanels(){
        const lst = [];
        const UniqueCategories = getUniqueCategories();
        for(var i=0 ; i < UniqueCategories.length ; i++){
            lst.push(
            <TabPanel 
                value={value} 
                index={i} 
                dir={theme.direction}
                > {checkedVeg ? supportVeg(UniqueCategories[i]) : support(UniqueCategories[i])}
            </TabPanel>
            );
        }
        
        return lst;
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
    if(getUniqueCategories().length <= 0){
        return(
        <Box style={{textAlign:"center"}}>
            <Typography>No Dish Available</Typography>
        </Box>
        );
    }else{
    return(
        <Box>
            <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="on"
                aria-label="full width tabs example"
                >
                {allTabs()}
            </Tabs>
            </Box>
            <Box>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {allPanels()}
            </SwipeableViews>
            </Box>
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

export default connect(mapStateToProps,{})(SliderView);