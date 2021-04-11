import React from 'react';
import {
    Box, Grid, Typography, IconButton, Chip, Avatar
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Veg from '../../assets/Veg.svg';
import NonVeg from '../../assets/NonVeg.svg';
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
                <Grid item xs={9} sm={9}>
                    <Box display="flex" flexDirection='row' justifyContent='left'>
                        <Box>
                            {
                                props.ImageUrl !== null &&
                                <Avatar src={props.ImageUrl} style={{width:100,height:'auto'}} variant='rounded'/>
                            }
                        </Box>
                        <Box>
                            <Box flexDirection="row" display="flex">
                                <Box>
                                {   props.tags !== null && 
                                    props.tags.includes("Veg") ?
                                    <Avatar src={Veg} variant='square' style={{width:15,height:15}}/>
                                    :
                                    props.tags !== null &&
                                    props.tags.includes("Non Veg") &&
                                    <Avatar src={NonVeg} variant='square' style={{width:15,height:15}}/>
                                }
                                </Box>
                                <Box>
                                    {   
                                        props.tags !== null &&
                                        props.tags.includes("Must Try") &&
                                        <Box display='flex' flexDirection='row' style={{marginLeft:10}}>
                                            <Avatar variant='square' src={Star} style={{width:15,height:15}}/>
                                            <Typography style={{marginLeft:2,fontSize:12}} className='mFont'>Must Try</Typography>
                                        </Box>
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
                                    <Box>
                                        <Box style={{border:'1px solid #FFD31D', borderRadius:5, backgroundColor:"#FFF",padding:2,paddingLeft:5,paddingRight:5}}>
                                            <Typography style={{fontSize:12}} className='mFont'>Speciality</Typography>
                                        </Box>
                                    </Box>
                                }
                                </Box>
                                
                                <Box>
                                {
                                    props.tags !== null &&
                                    props.tags.includes("Spicy") &&
                                    <Chip label="Spicy" size="small" avatar={<Avatar src={RedChilly}/>} variant="outlined" style={{borderColor:"#FFF"}}/>
                                }
                                </Box>
                                <Box>
                                {   
                                    props.tags !== null &&
                                    props.tags.includes("Med. Spicy") &&
                                    <Chip label="Med. Spicy" size="small" variant="outlined"
                                        avatar={<Avatar src={MediumSpicy}/>} style={{borderColor:"#FFF"}}
                                    />
                                }
                                </Box>
                                <Box>
                                {   
                                    props.tags !== null &&
                                    props.tags.includes("Sweet") &&
                                    <Chip label="Sweet" size="small" variant="outlined"
                                        avatar={<Avatar src={Sweet}/>} style={{borderColor:"white"}}
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
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={3} sm={3}>
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