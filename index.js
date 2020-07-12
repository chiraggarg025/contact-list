const express = require('express');
const port = 8000;
const path=require('path')
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
var contactList = [
    {
        name:'Chanakya',
        phone:'11111111111'
    },
    {
        name:'Tony Stark',
        phone:'22222222222'
    },
    {
        name:'Coding Ninjas',
        phone:'3333333333'
    }
]
app.get('/',function(req,res){
    return res.render('index',{
        title:'My Contact List',
        contact_list:contactList
    });
})
app.get('/playground',function(req,res){
    return res.render('playing',{title:'My Play list'});
})
app.post('/create-contact',function(req,res){
    return res.redirect('/playground');
})
app.listen(port,function(err){

    if(err){
        console.log('error:',err);
        return;
    }
    console.log('Server up and running on port:',port);
})


