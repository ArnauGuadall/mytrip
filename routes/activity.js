//
require('dotenv').config()
const express = require('express');
const router = express.Router();




/* GET activities. */
router.get('/activity', function(req, res, next) {
  res.render('app/activity', { key: process.env.GOOGLE_KEY });
});



module.exports = router;