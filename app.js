//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const homeStartingContent = "Hi,my name is Amitesh and I am an aspiring web developer. I am passionate about creating beautiful, functional and user-friendly websites that help businesses reach their full potential online.";
const aboutContent = "Hi,my name is Amitesh and I am an aspiring web developer. I am passionate about creating beautiful, functional and user-friendly websites that help businesses reach their full potential online. I am driven by my desire to constantly learn and improve my skills in web development, and to create meaningful digital experiences that make a difference in people's lives.I have always been fascinated by technology and its potential to connect people, solve problems and make the world a better place. This is what inspired me to pursue a career in web development, and I am excited to be taking the first steps towards realizing my dream.I have a solid foundation in HTML, CSS, and JavaScript, and I am currently expanding my knowledge in other areas such as React, Node.js, and Responsive Web Design. I am also always open to learning new tools, technologies, and frameworks that can help me build better websites and provide better experiences for users.";
const contactContent = "Contact me to build your website today!";

const app = express();

var posts = []

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.render("home", {hsc: homeStartingContent, postsArray: posts, lodash: lodash});
});

app.get("/posts/:blog", function(req, res){
    const requested = req.params.blog;
    posts.forEach(function(element){
      if(lodash.lowerCase(element.blogTitle) === lodash.lowerCase(requested)){
        res.render("post", {theTitle: element.blogTitle, theContent: element.blogPost,
          lodash : lodash
        });
      }
    });
});

app.get("/about", function(req, res){
  res.render("about", ({ac: aboutContent}));
});

app.get("/contact", function(req, res){
  res.render("contact", ({cc: contactContent}));
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  var post = {
    blogTitle : req.body.blog_title, blogPost : req.body.blog_post
  }
  posts.push(post);
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
