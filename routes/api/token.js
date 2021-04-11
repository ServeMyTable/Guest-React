const express = require('express');
const router = express.Router();
const Token = require('../../models/Token');
const User = require('../../models/Users');

// POST api/token/
// ADD Token
router.post("/",async (req,res)=>{
    
    try {
        const RestaurantID = req.body.Phone;
        const CustomerName = req.body.CustomerName;
        const NoOfPersons = req.body.NoOfPersons;

        const user = await User.findOne({Phone : RestaurantID});
        if(user !== null && user !== undefined){

            const Alltokens = await Token.findOne({RestaurantID : RestaurantID});

            const today = new Date().toISOString().slice(0, 10);
            
            var tokenNo;
            if(Alltokens !== null){
                const DateToCompare = new Date(Alltokens.Date).toISOString().slice(0,10);
                if(today === DateToCompare){
                    tokenNo = parseInt(Alltokens.tokenOngoing) + 1;
                }else{
                    tokenNo = 1;
                }
            }else{
                tokenNo = 1;
            }

            await Token.updateOne({RestaurantID : RestaurantID},
                {
                $push : {
                    Tokens : {
                        tokenNo: tokenNo,
                        Name : CustomerName,
                        NoOfPersons : NoOfPersons,
                        Status : 'Booked'
                    }        
                },
                $set:{
                    tokenOngoing : tokenNo,
                    Date : today
                }
                },
                {upsert : true}
            )
        
            res.status(200).send({
                tokenNo : tokenNo,
                Restaurant:{
                    UserName : user.username,
                    RestaurantName : user.RestaurantName,
                    RestaurantImage : user.ImageUrl,
                    RestaurantAddress : user.Location,
                    Phone : user.Phone
                },
                TokenDetails:{
                    CustomerName : CustomerName,
                    NoOfPeople : NoOfPersons,
                    Status: 'Booked',
                }
            });
        }else{
            res.status(200).send("User does not exists");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post('/waiting',async (req,res)=>{

    try {
        const body = req.body.Phone;
        const user = await User.findOne({Phone : body});
        const tokens = await Token.findOne({RestaurantID:body});
        if(user !== null && user !== undefined){
            res.status(200).send(tokens.Tokens);
        }else{
            res.status(200).send("User does not exists");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;