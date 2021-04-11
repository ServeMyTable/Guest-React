import React from 'react';

import Logo from '../../assets/logo.png';

import { 
    Box, AppBar, Toolbar, Divider, Menu, Checkbox, Button,
    IconButton, Avatar, Typography, Grid, FormControlLabel 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setCustomerDetails, setRestaurantDetails } from '../../actions/parcel';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchBar from '../components/SearchBar';
import ListView from './ListView';
import Checkout from './Checkout';

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
    NameAvatar:{
        width:100,
        height:100,
        fontSize:50,
        backgroundColor:'#FFD31D'
    }
}));

function Restaurant(props) {

    const classes = useStyles();
    const [searchText,setSearch] = React.useState('');
    const handleSearch = e =>{ setSearch(e.target.value); };

    React.useEffect(()=>{
        props.setCustomerDetails({Details:props.details});
    },[]);

    props.setRestaurantDetails({Phone:props.details.RestaurantID});

    const NavBar = () =>(
        <AppBar position="static" style={{backgroundColor:"#FFF"}}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Avatar src={Logo} variant="rounded" style={{width:50}}></Avatar>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                Serve My Table
                </Typography>
                <Button variant="outlined" startIcon={<FilterListIcon/>} aria-controls="simple-menu" aria-haspopup="true" onClick={handleFilter}>Filter</Button>
            </Toolbar>
        </AppBar>
    );
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCategories, setCategories] = React.useState({});
    const handleFilter = event =>{ setAnchorEl(event.currentTarget); };
    const handleClose = () =>{ setAnchorEl(null); };
    const handleChange = (event) =>{ setCategories({...selectedCategories,[event.target.name] : event.target.checked }); };
    function getUniqueCategories(){
        if(props.parcel.RestaurantDetails !== null){
            const Cate = props.parcel.RestaurantDetails.Categories;
            if(Cate && Cate !== null && Cate !== undefined){
                return Cate.filter(function(item, pos){return Cate.indexOf(item) === pos;});
            }
        }else{
            return [];
        }
    }
    function getFilteredCategories(){
        const lst = [];
        for(var key in selectedCategories){
            if(selectedCategories[key]){
                lst.push(key);
            }
        }
        return lst;
    }

    if(props.orderPlaced || props.parcel.OrderDetails !== null){ return <Checkout/> }else{
    return (    
        <Box>
            <NavBar/>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                
            >
                <Box style={{margin:10,padding:10}}>
                    <Typography>Categories</Typography>
                    <Divider/>
                    {getUniqueCategories().map((category)=>(
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={ handleChange }
                                    name={ category }
                                    color="primary"
                                />
                            }
                            label={ category }
                        />
                    ))}

                </Box>

            </Menu>
            <Box padding='20px'>
                <Grid container style={{marginBottom:20}}>
                    <Grid item sm={4} xs={4}>
                        {
                            props.parcel.RestaurantDetails &&
                            props.parcel.RestaurantDetails !== null &&
                            props.parcel.RestaurantDetails.ImageUrl && 
                            props.parcel.RestaurantDetails.ImageUrl !== null &&
                            props.parcel.RestaurantDetails.ImageUrl !== undefined 
                            ?
                            <Avatar src={props.parcel.RestaurantDetails.ImageUrl} style={{width:100,height:100}}/>
                            :
                            <Avatar className={classes.NameAvatar}>{props.parcel.RestaurantDetails.username && (props.parcel.RestaurantDetails.username)[0]}
                            </Avatar>
                        }
                        
                    </Grid>
                    <Grid item sm={8} xs={8}>
                        <Typography variant="h6">{props.parcel.RestaurantDetails && props.parcel.RestaurantDetails.RestaurantName}</Typography>
                        <Typography color="textSecondary">{props.parcel.RestaurantDetails && props.parcel.RestaurantDetails.Location}</Typography>
                        <Typography color="textSecondary"></Typography>
                    </Grid>
                </Grid>
                
                <SearchBar 
                    type="text"
                    placeholder="Search in Menu"
                    className="customSearch"
                    onChange={handleSearch}
                />
                <Box style={{marginTop:20}}></Box>
            </Box>
            <ListView 
                search={searchText} 
                filteredCategories={getFilteredCategories()}
            />
        </Box>
    );
    }
}

const mapStateToProps = state =>({
    parcel : state.parcel,
    orderPlaced : state.orderPlaced
});

export default connect(mapStateToProps,{setCustomerDetails, setRestaurantDetails})(Restaurant);