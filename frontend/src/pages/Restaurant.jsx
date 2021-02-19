import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../assets/logo.png';
import { 
    AppBar, Avatar, Box, Divider,
    Grid, IconButton, Button, Checkbox,
    Toolbar, Typography, Menu, FormControlLabel 
} from '@material-ui/core';
import SearchBar from './components/SearchBar';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FilterListIcon from '@material-ui/icons/FilterList';
import SliderView from './components/SliderView';
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
    
  }));

function Restaurant({user,getOrders,table,loading,errors}){
    const classes= useStyles();
    const [listView,setListView] = React.useState(false);
    const [searchText,setSearch] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCategories, setCategories] = React.useState({});
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
    return(
        <Box>
        {
            loading ?
                <LoadingScreen/>
            :
            <Box>
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
            <Box style={{margin : 10,padding:10}}>
                <Grid container>
                    <Grid item sm={4} xs={4}>
                        <Avatar src={user.ImageUrl} style={{width:100,height:100}}/>
                    </Grid>
                    <Grid item sm={8} xs={8}>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography color="textSecondary">{user.location}</Typography>
                        <Typography color="textSecondary">Table No. {user.TableNo}</Typography>
                    </Grid>
                </Grid>
                
                <Grid container style={{marginTop:10}} spacing={1}>
                <Grid item sm={9} xs={9}>
                    <SearchBar 
                        type="text"
                        placeholder="Search"
                        className="customSearch"
                        onChange={handleSearch}
                    />
                </Grid>
                <Grid item sm={2} xs={2}>
                    <Button 
                        startIcon={<FormatListBulletedIcon/>} 
                        variant="outlined" 
                        style={{boxShadow: '0 3px 6px rgba(0, 0, 0, 16%)'}}
                        onClick={()=>{setListView(!listView);}}
                        >   {!listView?"List":"Slide"}
                    </Button>
                </Grid>
                </Grid>
            </Box>
                {
                    !listView ? 

                    <SliderView 
                    search={searchText} 
                    filteredCategories={getFilteredCategories()}                    
                    /> 
                    : 
                    <ListView 
                    search={searchText} 
                    filteredCategories={getFilteredCategories()}
                    />
                }
                <Box style={{height:50}} />
                
            </Box>
        }
        </Box>
    );
}

Restaurant.propTypes = {
    user : PropTypes.object,
    table : PropTypes.array.isRequired,
    getOrders : PropTypes.func.isRequired,
    loading : PropTypes.bool
};

const mapStateToProps = state =>({
    user : state.auth.user,
    table : state.table,
    loading : state.loading,
    errors : state.errorHandler
});

export default connect(mapStateToProps,{getOrders})(Restaurant);