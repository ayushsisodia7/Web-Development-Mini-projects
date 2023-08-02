const express=require("express")
const Body_parser = require("body-parser")

var app = express();
app.use(Body_parser.urlencoded({extended:true}));
app.set('view engine', 'ejs')      //compiler will look for ejs file in view folder of project
app.use(express.static("public"))
var items=['Buy Food','Pay Money','Eat food']  
let workitems=[] 

app.get('/',function(req,res){

    var today = new Date()
    var currentday=today.getDay()   //numeric representation of day
    var day=""
    var options ={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    var day=today.toLocaleDateString("us-EN",options)            //get todays date in above specified format
    res.render('title', {listTitle: day, array:items})     //passing value of day to ejs variable KindOfDay
})

app.get('/work',function(req,res){
    res.render("title",{listTitle:"Work",array:workitems})
})

app.get('/about',function(req,res){
    res.render("about")
})

app.post('/',function(req,res){
var userinput=req.body.newItem;
if(req.body.list === "Work")
{
    workitems.push(userinput)
    res.redirect('/work')
}
else
{
    items.push(userinput)
    res.redirect('/')
}

})

app.post('/work',function(req,res){
    let item=req.body.newItem
    workitems.push(item)
    res.redirect('/work')
})

app.listen(3000,function(){
    console.log("Server running on port 3000")
})