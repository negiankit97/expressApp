var express = require("express");
var router = express.Router();
var Campground = require("../models/campground.js");
var middleware = require("../middleware/index.js");
//INDEX -SHOW ALL CAMPGROUNDS.
router.get("/", function(req, res){
    Campground.find({},function(err, campground){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{camp :campground,currentUser:req.user});
        }
    });
});
//CREATE A NEW CAMPGROUND
router.post("/",middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name : name, img:img ,description: description ,author:author ,price:price};
    Campground.create(newCamp, function(err, newcampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(newcampground);
            req.flash("success","New Campground successfully created");
           res.redirect("/campgrounds");
        }
    });
});

//NEW CAMPGROUND
router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
//SHOW A CAMPGROUND 
router.get("/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, allcampground){
        if(err){
            console.log(err);
        }
        else{
         res.render("campgrounds/show",{campground: allcampground});   
        }
    });
});
//EDIT CAMPGROUNDS
router.get("/:id/edit",middleware.checkUserOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/edit",{ campground : foundCampground});
});
});
//UPDATE CAMPGROUNDS
router.put("/:id",middleware.checkUserOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            req.flash("success","Campground updated successfully!!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//DELETE CAMPGROUND
router.delete("/:id",middleware.checkUserOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err,campground){
      if(err)
      {
          res.redirect("/campgrounds");
      }
      else
      {
          res.redirect("/campgrounds");
      }
   }); 
});

module.exports = router;