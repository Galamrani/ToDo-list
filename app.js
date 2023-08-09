
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require('./config');
require('dotenv').config(); // Load environment variables from .env file
const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); 


// Connect to the MongoDB database
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo todolistDB');
});

// Define the schema for to-do list items
const itemsSchema = new mongoose.Schema({
  name: { type: String, required: true }
});
// Create a model based on the itemsSchema
const Item = mongoose.model("Item", itemsSchema);

// Handle GET request to the root route ("/")
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

// Handle POST request to the root route ("/")
app.post("/", function(req, res){

    let itemName = req.body.newItem;
   
    insertItem(itemName);
    res.redirect("/");
});

// Handle POST request to delete an item
app.post("/delete", function(req, res) {
  const itemName = req.body.name;
  console.log(itemName);
  removeItem(itemName)
  res.redirect("/");
});

// Start the server on the specified port
app.listen(process.env.PORT || 3000, function(){
  const port = process.env.PORT || 3000;
  console.log("Server running on port:", port);
});

// Render the list view with items from the database
async function renderItemList(req, res, day) {
  try {
    const foundItems = await Item.find({});
    res.render("list", { kindOfDay: day, newListItems: foundItems });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('An error occurred while fetching items.');
  }
}

// Insert a new item into the database
async function insertItem(itemName) {
  const newItem = new Item({ name: itemName });

  try {
    const result = await newItem.save();
    console.log("Item saved in db");
  } catch (err) {
    console.error("Error saving document:", err);
  }
}

// Remove an item from the database
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
