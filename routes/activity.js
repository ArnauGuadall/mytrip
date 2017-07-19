//
const express   = require('express');
const Activity  = require("../models/activities");
const router    = express.Router();
var app = express();




/* GET activities. */
router.get('/activity', (req, res, next) => {

  Activity.find({}, function(err, activities){
      if(err){
        console.log(err);
      } else{
          res.render('app/activity', {activities});
          console.log('retrieved list of activities', activities);
      }
  })

});


router.post('/activity', (req, res, next) => {
  // tripId that is selected

  var newActivity = new Activity ({
      date: req.body.date,
      location: req.body.location_name,
      latitude: req.body.lat,
      longitude: req.body.lng,
      category: req.body.category,
      text: req.body.text,
      price: req.body.price
    });
    
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", newActivity);

    newActivity.save((err,doc) => {

      // Trip.findByIdAndUpdate(push newActivity.id) if err else 
      console.log("doooooc", doc);
      
      // res.send("$( '.last' ).append( '<p>"+doc+"</p>' )");
      console.log("doooooc end");
      res.json(doc)
    });

  
})




module.exports = router;

// ceate Activity -> push Activity in the trip 
// when go trip view all the related Activity
