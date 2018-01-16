require('dotenv').config();
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser     = require('body-parser');
const sgMail = require('@sendgrid/mail');
const TeleBot = require('telebot');
const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

bot.on(['/start'], (msg) => {
    return bot.sendMessage(msg.from.id, `Welcome, ${msg.from.first_name}! \n
    I am a telegram bot which can provide you with updated on the popular 
    crypto currency prices in INR and keep you update to date as
    and when required.
    \n
    - Made by http://riazxrazor.in
    `);
});

bot.on(['/hello'], (msg) => {
    return bot.sendMessage(msg.from.id, `Hello, ${ msg.from.first_name }!`);
});

app.set('view engine', 'ejs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static(__dirname + '/assets'))
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.render("index");
});

router.get("/mining",function(req,res){
  res.render("mining");
});

router.get("/help-me",function(req,res){
  res.render("mining");
});

router.get("/contact",function(req,res){
  res.render("contact",req.query);
});

router.post("/contact",function(req,res){
  console.log(JSON.stringify(req.body));
  
let txt = '<p><strong>Name:</strong> '+req.body.name+'</p><p><strong>Email:</strong> '+req.body.email+'</p><p><strong>Phone:</strong> '+req.body.phone+'</p><p><strong>Query:</strong> '+req.body.message+'</p>';
const msg = {
  to: 'riazcool77@gmail.com',
  from: req.body.email,
  subject: 'riazxrazor.in : website query',
  text: req.body.message,
  html: txt,
};
sgMail.send(msg);
  
  res.redirect('/contact?msg=Thank you, i will get in touch with you soon.');
});

router.get("/about",function(req,res){
   res.render("about");
});

router.get("/test",function(req,res){
   res.render("test");
});

router.get("/celeberate",function(req,res){
   res.render("celeberate");
});


app.use("/",router);

app.use("*",function(req,res){
  res.render("404");
});
var port = 8080;
app.listen(port,function(){
  console.log("Live at Port "+port);
  bot.start();
});
