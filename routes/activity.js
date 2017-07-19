//
const express   = require('express');
const Activity  = require("../models/activities");
const Trip  = require("../models/trip");
const router    = express.Router();
var app = express();




/* GET activities. */
router.get('/trip/:id/activities', (req, res, next) => {

  var tripid = req.params.id;

  Trip
      .findOne({_id: tripid})
      .populate("activities")
      .exec((err, trip) => {
        if (err) {
          next(err);
          return;
          }
        res.render('app/activity', {trip});

  });


});


router.post('/trip/:id/activities', (req, res, next) => {
  // tripId that is selected

  var tripid = req.body.tripid;

  console.log("tripid", tripid);

  var newActivity = new Activity ({
      date: req.body.date,
      location: req.body.location_name,
      latitude: req.body.lat,
      longitude: req.body.lng,
      category: req.body.category,
      text: req.body.notes,
      price: req.body.price
    });

    newActivity.save((err,doc) => {

      // Trip.findByIdAndUpdate(push newActivity.id) if err else 
      console.log("doooooc", doc);
      
      Trip.findById(tripid, (err, trip) => {
          trip.activities.push(doc._id); 
          trip.save();
          res.json(doc);
      })
                  
    });    

})


module.exports = router;