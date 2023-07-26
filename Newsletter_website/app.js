const express = require("express");
const Body_parser = require("body-parser");
const request = require("request");

var app = express();
app.use(express.static("public")); //to get static things like css and images on server
app.use(Body_parser.urlencoded({ extended: true }));       //get entered details by user

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");        //homepage
});

app.post("/", function (req, res) {
  var f = req.body.first;                //first name
  var l = req.body.last;                 //last name
  var e = req.body.email;                //email

  var data = {
    members: [
      //creating array of data which is entered by user
      {
        email_address: e,
        status: "subscribed", //status to be set since they are subscribing, can also be set to unsubscibed
        merge_fields: {
          FNAME: f,                 //storing first and last names of subscriber
          LNAME: l,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data); //convert js value to JSON string

  var options = {
    url: "https://us21.api.mailchimp.com/3.0/lists/cc49b2292d", //url of list, always change last part with list number
    method: "POST",
    headers: {
      Authorization: "ayushsisodia1 e4b02bdc286832ea74fe363a77007a4b-us21", //using API key for authentication (syntax: "username api key")
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error || response.statusCode != "200") {
      res.sendFile(__dirname+"/failure.html");            //incase of failure
    } else {
      res.sendFile(__dirname+"/success.html");             //if success
    }
  });
});

app.post('/failure',function(req,res){
    res.redirect('/')                              //redirect to homepage incase of failure
})

app.listen(process.env.PORT || 3000, function () {                         //use 3000 for local host or process.env.PORT for hosting
  console.log("Server is running on port 3000");
});

//e4b02bdc286832ea74fe363a77007a4b-us21            //API key for MailChimp API

//cc49b2292d                                         //list number for this project
