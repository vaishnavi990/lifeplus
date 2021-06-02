const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost/hospital')
mongoose.Promise = global.Promise;

//initialize routes
var multer = require('multer');
var upload = multer();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(upload.array()); 
app.use('',require('./routes/app'))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
//error handling middleware
app.use(function(err,req,res,next){
    //console.log(err)
    res.status(422).send({error: err.message});
})

app.listen(process.env.port || 4000, function(){
    console.log('listening to port')
})