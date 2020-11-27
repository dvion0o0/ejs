const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const url = "mongodb+srv://dvion0o0:Mynumber1@@cluster0.1u9rp.mongodb.net/todolistDB";

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true});

const schema = new mongoose.Schema({
    name:String
});

const list = mongoose.model("List", schema);

const list1 = new list ({
    name:"Welcome to your todo list!"
});

const list2 = new list ({
    name:"Hit the + button to add a new list."
});

const list3 = new list ({
    name:"hit checkbox to delete the list."
});

const defaultItems = [list1, list2, list3];



app.get("/", (req, res) =>{
list.find({}, (err, foundItems) =>{
if(foundItems.length === 0){
list.insertMany(defaultItems, (err) =>{
    if(err) throw err;
    console.log("succesfully saved to the collection");
    res.redirect("/");
});
}else{
    res.render("list", {listTitle: "Today", newListItems: foundItems});
}
});
});


app.post("/", (req,res) =>{
  const listName = req.body.newitem;

  console.log(listName);

  const item = new list({
      name: listName
  });

item.save();

res.redirect("/");

});


app.post("/delete", (req,res) =>{
   const checkedId = req.body.checkbox; 
list.findByIdAndRemove(checkedId, (err) =>{
    if(err) throw err;
    console.log("item deleted");
    res.redirect("/")
});

});


// app.get("/work", (req, res) =>{
//     res.render("list", {listTitle: 'Work List', newListItems: workItems});
// });





app.listen(process.env.PORT || 8000, ()=> console.log('sevrer has started on port 8000'));