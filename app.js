
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 

var items = [];

app.get("/", function(req, res){

    let today = new Date();
    let options = {
        weekday: "long", 
        day: "numeric", 
        month: "long"
    };
    let day = today.toLocaleDateString("en-US",options);

    res.render("list", {kindOfDay: day, newListItems: items});
});

app.post("/", function(req, res){

    let item = req.body.newItem;
    console.log(item);

    items.push(item);
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    var index = req.body.index; 
  
    if (index >= 0 && index < items.length) {
      items.splice(index, 1);
    }
  
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("running on port 3000  ")
});  