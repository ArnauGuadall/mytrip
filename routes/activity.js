//
require('dotenv').config()
const express   = require('express');
const Activity  = require("../models/activities");
const router    = express.Router();




/* GET activities. */
router.get('/activity', (req, res, next) => {
  res.render('app/activity');
});


router.post('/activity', (req, res, next) => {
  // tripId that is selected

  // console.log(req.body);

  const newActivity = new Activity ({
      date: req.body.date,
      location: req.body.location_name,
      latitude: req.body.lat,
      longitude: req.body.lng,
      category: req.body.category,
      text: req.body.text,
      price: req.body.price
    });
    
    console.log(newActivity);

    newActivity.save((err) => {

      // Trip.findByIdAndUpdate(push newActivity.id) if err else 
      res.redirect("/activity");
    });

  
})



module.exports = router;

// ceate Activity -> push Activity in the trip 
// when go trip view all the related Activity
