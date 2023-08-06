
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 

var items = []; //to dealte

mongoose.connect("mongodb://localhost:27017/todolistDB")

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

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
   
    saveToDB(item);

    //items.push(item);
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    var index = req.body.index; 
  
    if (index >= 0 && index < items.length) {
      items.splice(index, 1);
    }
  
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("running on port 3000  ")
});

async function saveToDB(item) {
    try {
      await Item.create({ name: item });
      console.log("Item saved successfully.");
    } catch (err) {
      console.error("Error saving item:", err);
    }
  }