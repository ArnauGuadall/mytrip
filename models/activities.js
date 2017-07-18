//Activity Model
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const activitySchema = new Schema({
  date: Date,
  location: String,
  latitude: Number,
  longitude: Number,
  category: String,
  text: String,
  price: Number
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;



