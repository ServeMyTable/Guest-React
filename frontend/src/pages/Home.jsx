import React from 'react';
import { Redirect } from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import {login} from '../actions/auth';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { TextField, Box, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { setLoading } from '../actions/loading';

import LoadingScreen from './components/LoadingScreen';

function Home({auth,login,errorHandler,loading}){
    
    const [formData,setFormData] = React.useState({
        CustomerName : "",
        id : "",
        table : ""
    });
    const [disable,setDisable] = React.useState(true);

    const onChange = e => { setFormData({...formData, [e.target.name] : [e.target.value]}) };
    const onSubmitData = e =>{
        e.preventDefault();
        const data = {
            id : (formData.id)[0],
            table : (formData.table)[0],
            CustomerName : (formData.CustomerName)[0]
        };
        setLoading();
        login(data);
        
    };
    
    
    if(auth.isAuthenticated){
        return <Redirect to="/restaurant"/>
    }
    function handleScan(data){
        if(data){

            const mData = (data.split("?")[1]).split("&");
            const finalData = {
                id : mData[0].split("=")[1],
                table : mData[1].split("=")[1]
            }
            setLoading();  
            login(finalData);
        }
    }
    
    function handleError(err){ console.error(err); }
    function startScanning(){ setDisable(false); }

    return(
        loading ? 
        <LoadingScreen/>
        :
        <Box className="LoginParent">
            <Box textAlign="center">
                <Box style={{marginTop:10}}>
                    <Typography variant="h4">Serve My Table</Typography>
                </Box>

                {!disable ?
                
                <QrReader
                    onScan={handleScan}
                    facingMode="rear"
                    onError={handleError}
                    delay={100}
                    className="preview"
                    style={{
                        position: "absolute",
                        top: 85,
                        left: 20,
                        width: "88%",
                        height: "60%",
                        borderRadius: "10px",
                    }}
                />
                
                : <Box className="preview"></Box>
                }
                <Box textAlign="center" style={{marginLeft:20,marginRight:20}}>
                    <Button 
                        variant="contained" 
                        style={{
                            marginTop:20,
                            backgroundColor:"#FFD31D",
                            
                            }} 
                        fullWidth
                        onClick={startScanning}
                        disableElevation
                        >Scan QR Code</Button>
                    
                    <Typography 
                        style={{
                            marginTop : 20,
                            marginBottom : 20
                        }}
                    >OR</Typography>
                    {
                        errorHandler.errorStatus &&
                        <Alert severity={errorHandler.errorType}>
                            {errorHandler.errorMsg}
                        </Alert>
                    }
                    <Box>
                        <TextField
                            variant="outlined" 
                            className="loginInput mFont" 
                            name="CustomerName" type="text" 
                            placeholder="Enter your Name " 
                            onChange={onChange}
                            value={formData.CustomerName}
                            
                            required
                            />
                    </Box>
                    <Box style={{marginTop:10}}>
                        <TextField
                            variant="outlined" 
                            className="loginInput mFont" 
                            name="id" 
                            type="tel" 
                            placeholder="Enter Restaurant's Phone No." 
                            onChange={onChange}
                            value={formData.id}
                            required
                            />
                    </Box>
                    <Box style={{marginTop:10}}>
                        <TextField
                            variant="outlined" 
                            className="loginInput mFont" 
                            min="0" name="table" type="number" 
                            placeholder="Enter Restaurant's Table No." 
                            onChange={onChange}
                            value={formData.table}
                            required
                            />
                    </Box>
                    <Button 
                        variant="outlined" 
                        disableElevation 
                        style={{ marginTop:10 }} 
                        color="primary"
                        onClick={onSubmitData}
                        fullWidth
                        >View Restaurant's Menu</Button>
                </Box>
            </Box>
        </Box>

    )
}

Home.propTypes = {
    login : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    loading : PropTypes.bool,
};

const mapStateToProps = state =>({
    auth : state.auth,
    errorHandler : state.errorHandler,
    loading : state.loading
});

export default connect(mapStateToProps,{login})(Home);