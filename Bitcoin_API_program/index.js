const express=require("express")
const BodyParser=require("body-parser")
const request=require("request")

var app=express();
app.use(BodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){   //include html file for webpage
    res.sendFile(__dirname+"/index.html");
})

app.post('/',function(req,res){   //output after entering data
    var crypto=req.body.crypto;
    var fiat=req.body.fiat;
    var amount=req.body.amount;

    var options={    //Setting url with parameters
        url:"https://apiv2.bitcoinaverage.com/convert/global",
        method:"GET",
        qs:{
            from:crypto,
            to:fiat,
            amount:amount
        }
    }

    request(options,function(error,response,body){    //call to API
    var data=JSON.parse(body);
    var p=data.price;
    res.write("The current price of "+crypto+" is "+p);
    res.send();
    })
    
})

app.listen(3000,function(){   //port server for localhost
    console.log("Server is running");
})