var middlewareObj = {};
var Comment = require("../models/comment.js");
var Campground = require("../models/campground.js");

middlewareObj.checkCommentOwnership = function(req,res,next)
{
   if(req.isAuthenticated())
    {
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err)
        {
            req.flash("error","Please log in first!!!");
            res.redirect("back");
        }
        else
        {
            if(foundComment.author.id.equals(req.user._id))
            {
            next();
            }
            else{
                req.flash("error","You do not have the permission to do that!!");
                res.redirect("back");
            }
        }
    });
    }
    else
    {
        res.redirect("back");
    }
};
middlewareObj.checkUserOwnership = function(req,res,next){
   if(req.isAuthenticated())
    {
     
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err)
        {
             req.flash("error","Please log in first!!!");
            res.redirect("back");
        }
        else
        {
            if(foundCampground.author.id.equals(req.user._id))
            {
            next();
            }
            else{
                 req.flash("error","You do not have the permission to do that!!");
                res.redirect("back");
            }
        }
    });
    }
    else{
        res.redirect("back");
    }
};
middlewareObj.isLoggedIn = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
        req.flash("error","Please log in first");
        res.redirect("/login");    
};

module.exports = middlewareObj;