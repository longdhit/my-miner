const express = require("express");
const app = express();
const router = express.Router();
const bodyParser     = require('body-parser');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

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

app.use("/",router);

app.use("*",function(req,res){
  res.render("404");
});
var port = 8080;
app.listen(port,function(){
  console.log("Live at Port "+port);
});