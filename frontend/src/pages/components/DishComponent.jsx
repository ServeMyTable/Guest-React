import React from 'react';
import {
    Box, Grid, Typography, IconButton, Chip, Avatar
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Veg from '../../assets/leaf.png';
import NonVeg from '../../assets/chicken-leg.png';
import Star from '../../assets/star.png';
import RedChilly from '../../assets/redchilly.png';
import MediumSpicy from '../../assets/mediumchilly.png';
import Sweet from '../../assets/candy.png';

function DishComponent(props){
    const [counter,setCounter] = React.useState(0);

    function handleIncrement(){ 
        setCounter(counter+1); 
        props.handleAddFunc({
            name:props.name,
            price:props.price,
            units:counter+1,
            type:0,
            id:props.id
        });
    }
    function handleDecrement(){ 

        counter === 0 ? setCounter(0) : setCounter(counter-1)
        props.handleAddFunc({
            name:props.name,
            price:props.price,
            units:counter-1,
            type:0,
            id:props.id
        });
        
    }
    React.useEffect(()=>{
        props.cart.forEach(element => {
            if(element.id === props.id){
                setCounter(element.units);
            }
        });
    },[])

    return(
        <Box>
            <Grid container>
                <Grid item xs={7} sm={7}>
                    <Box flexDirection="row" display="flex">
                    <Box>
                    {   props.tags !== null && 
                        props.tags.includes("Veg") ?
                        <Chip variant="outlined" size="small" label="Veg" avatar={<Avatar src={Veg}/>} style={{borderColor:"#00FF00"}}/>
                        :
                        props.tags !== null &&
                        props.tags.includes("Non Veg") &&
                        <Chip variant="outlined" size="small" label="Non Veg" avatar={<Avatar src={NonVeg}/>} style={{borderColor:"rgb(255,90,53)"}}/>
                    }
                    </Box>
                    <Box>
                        {   
                            props.tags !== null &&
                            props.tags.includes("Must Try") &&
                            <Chip label="Must Try" size="small" variant="outlined" avatar={<Avatar src={Star}/>}
                                style={{borderColor:"#FFF"}}
                            />
                        }
                    </Box>
                    </Box>
                    <Typography>
                        {props.name}       
                    </Typography>
                    <Box flexDirection="row" display="flex">
                        <Box>
                        {
                            props.tags !== null &&
                            props.tags.includes("Speciality") &&
                            <Chip label="Speciality" size="small" variant="outlined" style={{borderColor:"#FFD31D"}}/>
                        }
                        </Box>
                        
                        <Box>
                        {
                            props.tags !== null &&
                            props.tags.includes("Spicy") &&
                            <Chip label="Spicy" size="small" avatar={<Avatar src={RedChilly}/>} variant="outlined" style={{borderColor:"#FF0000"}}/>
                        }
                        </Box>
                        <Box>
                        {   
                            props.tags !== null &&
                            props.tags.includes("Med. Spicy") &&
                            <Chip label="Med. Spicy" size="small" variant="outlined"
                                avatar={<Avatar src={MediumSpicy}/>} style={{borderColor:"#808000"}}
                            />
                        }
                        </Box>
                        <Box>
                        {   
                            props.tags !== null &&
                            props.tags.includes("Sweet") &&
                            <Chip label="Sweet" size="small" variant="outlined"
                                avatar={<Avatar src={Sweet}/>} style={{borderColor:"whitesmoke"}}
                            />
                        }
                        </Box>
                    </Box>
                    <Typography style={{fontSize:"small"}} color="textSecondary">
                        {props.desc !== null && props.desc !== undefined && props.desc}
                    </Typography>
                    <Typography style={{fontSize:"medium"}}>
                        <strong>Rs. {props.price}</strong>
                    </Typography>
                </Grid>
                <Grid item xs={5} sm={5}>
                { counter!==0 
                    ? <IconButton onClick={()=>{handleDecrement();}}><RemoveIcon/></IconButton>
                    : <IconButton><RemoveIcon/></IconButton> 
                }
                        {counter}
                    <IconButton 
                    onClick={()=>{handleIncrement();}}
                    ><AddIcon/></IconButton>
                </Grid>
            </Grid>
            <br/><br/>
        </Box>
    );
}

export default DishComponent;