
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 



mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo todolistDB');
});


const itemsSchema = new mongoose.Schema({
  name: { type: String, required: true }
});
const Item = mongoose.model("Item", itemsSchema);

var items = [];

app.get("/", function(req, res){

    let today = new Date();
    let options = {
        weekday: "long", 
        day: "numeric", 
        month: "long"
    };
    let day = today.toLocaleDateString("en-US",options);

    renderItemList(req, res, day);
});

app.post("/", function(req, res){

    let itemName = req.body.newItem;
   
    insertItem(itemName);
    res.redirect("/");
});

app.post("/delete", function(req, res) {
  const itemName = req.body.name;
  console.log(itemName);
  removeItem(itemName)
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  const port = process.env.PORT || 3000;
  console.log("Server running on port:", port);
});


async function renderItemList(req, res, day) {
  try {
    const foundItems = await Item.find({});
    res.render("list", { kindOfDay: day, newListItems: foundItems });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('An error occurred while fetching items.');
  }
}

async function insertItem(itemName) {
  const newItem = new Item({ name: itemName });

  try {
    const result = await newItem.save();
    console.log(itemName + " saved in db");
  } catch (err) {
    console.error("Error saving document:", err);
  }
}

async function removeItem(itemName) {
  try {
    const result = await Item.deleteOne({ name: itemName });
    if (result.deletedCount === 1) {
      console.log('Item deleted successfully.');
    } else {
      console.log('Item not found or not deleted.');
    }
  } catch (err) {
    console.error('Error deleting item:', err);
  }
}
