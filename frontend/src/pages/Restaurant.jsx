import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Logo from '../assets/logo.png';
import { 
    AppBar, Avatar, Box, Divider,
    IconButton, Button, Checkbox,
    Toolbar, Typography, Menu, FormControlLabel 
} from '@material-ui/core';
import SearchBar from './components/SearchBar';
import FilterListIcon from '@material-ui/icons/FilterList';
import ListView from './components/ListView';
import { makeStyles } from '@material-ui/core/styles';
import { getOrders } from '../actions/table';
import Alert from '@material-ui/lab/Alert';
import LoadingScreen from './components/LoadingScreen';


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
    alignCenter:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center'
    },
    alignSpaceBetween:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    MENUCARDHEADING:{
        letterSpacing:2,
        marginLeft:20,
        fontFamily:'Noto Sans, sans-serif'
    },
    TableHeading:{
        marginLeft:20,
        fontFamily : 'Noto Sans, sans-serif',
        fontWeight:700,
        marginBottom:10
    }
  }));

function Restaurant({user,getOrders,loading,errors}){
    const classes= useStyles();
    const [searchText,setSearch] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCategories, setCategories] = React.useState({});
    const [Veg,setVeg] = React.useState(false);

    const handleChangeVeg = e => { setVeg(!Veg) }; 
    const handleSearch = e =>{ setSearch(e.target.value); };
    const handleFilter = event =>{ setAnchorEl(event.currentTarget); };
    const handleClose = () =>{ setAnchorEl(null); };
    const handleChange = (event) =>{ setCategories({...selectedCategories,[event.target.name] : event.target.checked }); };
    function getUniqueCategories(){
        
        if(user.Categories !== null && user.Categories !== undefined){
            return user.Categories.filter(function(item, pos){return user.Categories.indexOf(item) === pos;});
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

    getOrders();

    if(loading){
        return <LoadingScreen/>;
    }else{
        return(
            <Box>
                <AppBar position="fixed" style={{backgroundColor:"#FFF"}}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <Avatar src={user.ImageUrl} variant="rounded" style={{width:40}}></Avatar>
                        </IconButton>
                        
                        <Typography variant="h6" className={classes.title}>{user.name}</Typography>
                            
                        
                        <Button variant="outlined" startIcon={<FilterListIcon/>} aria-controls="simple-menu" aria-haspopup="true" onClick={handleFilter}>Filter</Button>
                    </Toolbar>
                    <SearchBar 
                        type="text"
                        placeholder="Search in Menu"
                        onChange={handleSearch}
                        style={{
                            paddingLeft:10,
                            paddingBottom:10
                        }}
                    />
                    
                </AppBar>
                
                {errors.errorStatus && <Alert severity={errors.errorType}>{errors.errorMsg}</Alert>} 
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

                <Box className={classes.alignSpaceBetween} style={{marginTop:120}}>
                    <Box>
                        <Typography className={classes.TableHeading}>Table No. {user.TableNo}</Typography>
                        <Typography className={classes.MENUCARDHEADING}>MENU CARD</Typography>
                        <Box style={{height:10,background:'#FFD31D',width:40,marginLeft:20}}/>
                    </Box>
                    
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={ handleChangeVeg }
                                    name='Veg'
                                    color="primary"
                                    checked={Veg}
                                />
                            }
                            label='Veg'
                        />
                    </Box>
                </Box>

                <ListView 
                    search={searchText} 
                    filteredCategories={getFilteredCategories()}
                    checkedVeg={Veg}
                />
                    
            </Box>
            
        );
    }
}

Restaurant.propTypes = {
    user : PropTypes.object,
    getOrders : PropTypes.func.isRequired,
    loading : PropTypes.bool
};

const mapStateToProps = state =>({
    user : state.auth.user,
    loading : state.loading,
    errors : state.errorHandler
});

export default connect(mapStateToProps,{getOrders})(Restaurant);