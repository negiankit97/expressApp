var mongoose = require("mongoose");
var Campground = require('./models/campground.js');
var Comment = require("./models/comment.js");

var data = [{name: "Daisy Camp",img:"https://images.pexels.com/photos/221436/pexels-photo-221436.jpeg?cs=srgb&dl=ash-black-bucket-221436.jpg&fm=jpg",description:"Charlie is in position"},
{name: "Bravo Camp",img:"https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?cs=srgb&dl=adventure-backlit-camper-776117.jpg&fm=jpg", description:"Blah Blah Blah"},
{name: "Alpha Camp",img:"https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=timothy-meinberg-206976-unsplash.jpg&s=4a5b54e328d2fb5bfc26a85d83d15348",description:"Delta is in position"}];

function seedDb()
{
Campground.remove({},function(err){
      if(err)
      {
          console.log(err);
      }
          console.log("campground is removed");
          data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
              if(err)
              {
                  console.log(err);
              }
              else{
               console.log("campground added");
            Comment.create({
                text:"This place is great.I had fun.",
                author:"James Gunn"
            },function(err, comment){
                if(err)
                {
                    console.log(err)
                    
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Comment is created");
                }
            })
        }
    });  
    })
});
}
module.exports = seedDb;