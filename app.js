var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    seedDb = require("./seeds"),
    localStrategy = require("passport-local"),
    passport = require("passport"),
    User = require("./models/user.js"),
    flash = require("connect-flash");


var commentsRoutes = require("./routes/comments.js"),
    campgroundsRoutes = require("./routes/campgrounds.js"),
    authRoutes = require("./routes/auth.js");
    
 //seedDb(); //seed the database
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//PASSPORT CONFIGURATIONS
app.use(require("express-session")({
    secret:"This is our littel secret",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//Schema Setup
/*camp.create(
    {name: "Granite Hill",
    img :"https://static.pexels.com/photos/733853/pexels-photo-733853.jpeg?cs=srgb&dl=antique-backdrop-background-733853.jpg&fm=jpg",
    description:"You wont have bathroom.Great scenery though."    
    }
     , function(err, camping){
         if(err)
         {
            console.log(err);
         }
         else
         {
             console.log("NEW CAMPGROUND HAS STARTED");
         }
     });
*/
app.get("/", function(req, res){
    res.render("landing");
});
app.use("/",authRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp has Started");
});