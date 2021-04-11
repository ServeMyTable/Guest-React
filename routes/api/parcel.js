const express = require('express');
const router = express.Router();
const Table = require('../../models/Table');
const User = require('../../models/Users');
const uuid = require('uuid');

router.post('/valid',async (req,res)=>{
    try {
        const user = await User.findOne({Phone : req.body.RestaurantID});
       
        if(user === null || user === undefined){
            res.send(false);
        }else{
            res.send(true);
        }
    } catch (error) {
        console.log(error);
        res.send(false);
    }
});

router.post('/restaurant',async (req,res)=>{
    try {
        
        const user = await User.findOne({Phone : req.body.Phone}).select('-password');
        const body = {
            RestaurantName : user.RestaurantName,
            Location : user.Location,
            Dishes : user.Dishes,
            Categories : user.Categories,
            ImageUrl : user.ImageUrl,
            username : user.username,
            Taxes : user.Taxes
        }
        if(user !== null && user !== undefined) res.status(200).send(body);

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

router.post('/placeOrder',async (req,res)=>{

    try{
        const Orders = [];
        const temp = req.body.Dish;
        const CustomerName = req.body.CustomerName;
        const TableNo = req.body.TableNo;
        const RestaurantID = req.body.id;
        const CustomerAddress = req.body.CustomerAddress;
        const CustomerPhone = req.body.CustomerPhone;
        const OrderType = req.body.OrderType;
        const Bill = parseFloat(req.body.TotalBill);
        const notes = req.body.notes;
        const Today = new Date(Date.now()).toLocaleString().split(',');
        const date = Today[0].toString();
        const Time = Today[1].toString();
        var UniqueId = "S"+uuid.v4()+Math.floor(Math.random()*99999).toString();

        for(var i = 0 ; i < temp.length ; i++){
            Orders.push({
                DishName : temp[i].name,
                Quantity : temp[i].units,
                Rate : temp[i].price
            });
        }

        const data = 
        {
            RestaurantID : RestaurantID,
            tableNo : TableNo,
            OrderId : UniqueId,
            Orders : Orders,
            TotalBill : Bill,
            SubTotal : req.body.SubTotal,
            CustomerName : CustomerName,
            PaymentMode : req.body.PaymentMode,
            OrderPlacedTime : Time,
            OrderPlacedDate : date,
            notes : notes,
            PaymentStatus : true,
            CustomerAddress : CustomerAddress,
            OrderType : OrderType,
            CustomerPhone:CustomerPhone,
            
        };

        await Table.updateOne(
            {RestaurantID:RestaurantID},
            {$push:{Tables:data}},
            {upsert:true}
        );    
        res.status(200).json(data);
    
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;