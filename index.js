const express = require('express');
const port = 8000;
const path=require('path')
const app = express();
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const { Console } = require('console');
// setting up template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Middleware (used to manipulate requests)
app.use(express.urlencoded());
app.use(express.static('assets'));
// app.use(function(req,res,next){
//     req.myname='Chanakya';
//     next();
// })
// app.use(function(req,res,next){
//     console.log('from middleware 2 myName = ',req.myname);
//     next();
// })
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

Contact.find({},function(err,contacts){
    if(err){
        Console.log('Error in fetching contacts');
        return;
    }
    return res.render('index',{
        title:'My Contact List',
        contact_list:contacts
    });
})

    
})
app.get('/playground',function(req,res){
    return res.render('playing',{title:'My Play list'});
})
app.post('/create-contact',function(req,res){
    Contact.create({
        name :req.body.name,
        phone :req.body.phone
    },function(err,newContact){
        if(err){
            console.log('Error in creating the contact');
            return ;
        }
        console.log(newContact);
        return res.redirect('back');
    })
})

app.get('/delete-contact/',function(req,res){
    // console.log(req.query.phone);
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting contact');
            return;
        }
        return res.redirect('back');

    });

})


app.listen(port,function(err){

    if(err){
        console.log('error:',err);
        return;
    }
    console.log('Server up and running on port:',port);
})


