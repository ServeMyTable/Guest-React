const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect to Database
connectDB();

//Initialize Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/restaurant',require('./routes/api/restaurant'));
app.use('/api/table',require('./routes/api/table'));
app.use('/api/feedback',require('./routes/api/feedback'));
app.use('/api/token',require('./routes/api/token'));
app.use('/api/parcel',require('./routes/api/parcel'));

app.get("/*", (req, res) => { res.sendFile(path.join(__dirname, "/frontend/build/index.html")); });

app.listen(process.env.PORT || 5000,function(){ 
    console.log('Server is up and Running on http://localhost:5000'); 
});
