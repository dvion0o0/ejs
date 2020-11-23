const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var items = ['Buy Food', 'Cook Food', 'Eat Food'];

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) =>{

var today = new Date();
var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};

var day = today.toLocaleDateString('en-US', options);

res.render('list', {kindofday: day, newListItems: items});
});


app.post("/", (req,res) =>{
    var item = req.body.newitem;
    items.push(item);
    res.redirect("/");
})



app.listen(8000, ()=> console.log('sevrer has started on port 8000'));