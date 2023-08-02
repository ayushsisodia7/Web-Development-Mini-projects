const express=require("express");
const BodyParser = require("body-parser");

var app=express();
app.use(BodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/BMI.html")
})

app.post('/',function(req,res){
    var w=Number(req.body.Weight);
    var h=Number(req.body.Height);
    var BMI=w/(h*h);

    res.send("Your BMI is "+ BMI);
})

app.listen(3000, function(){
    console.log("runnning BMI");
    console.log(__dirname);
});
