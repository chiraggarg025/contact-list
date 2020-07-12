const express = require('express');
const port = 8000;
const path=require('path')
const app = express();
// setting up template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// Middleware (used to manipulate requests)
app.use(express.urlencoded());
app.use(function(req,res,next){
    req.myname='Chanakya';
    next();
})
app.use(function(req,res,next){
    console.log('from middleware 2 myName = ',req.myname);
    next();
})
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
    // return res.redirect('/playground');
    contactList.push(req.body);
    return res.redirect('back');
})
app.listen(port,function(err){

    if(err){
        console.log('error:',err);
        return;
    }
    console.log('Server up and running on port:',port);
})


