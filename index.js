const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect("mongodb+srv://userakademi:MQfSivTSQyWidFPR@cluster0.9orl8.mongodb.net/akademiecommerce?retryWrites=true&w=majority",{ useNewUrlParser: true })

const categorySchema = new Schema({
    name:String,
    description:String
})

const webUserSchema = new Schema({
    addDate: { type: Date, default: Date.now },
    email:String,
    password:String,
    address:[],
})

const productSchema = new Schema({
    name:String,
    price:Number,
    // category: {type:categorySchema}
    // category:{}
    categoryId:String,
    //  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
})


const categoryModel = mongoose.model('Category', categorySchema);
const productModel = mongoose.model('Product', productSchema);
const webUserModel = mongoose.model('Webuser', webUserSchema);




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res){
     res.json({name:'Iron Maiden'});
});


app.get('/category', function(req,res){

    categoryModel.find({},function (err,docs){
        
        if(!err){
            res.json(docs)
        }
        else{
            res.status(500).json(err)
        }
    })
  
});

app.get('/category/:id', function(req,res){

    let categoryId = req.params.id;
    let category = categories.find(q => q.id == categoryId);

    res.json(category);
});


app.post('/category', function(req,res){

    var newCategory = new categoryModel({
        name:req.body.name,
        description:req.body.description
    });

    newCategory.save(function(err,doc){
        if(!err){
            res.json(doc);
        }
        else{
            res.status(500).json(err);
        }
    })

})



app.listen(3000);