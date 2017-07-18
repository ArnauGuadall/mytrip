//Activity Model
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const activitySchema = new Schema({
  date: Date,
  hour: String,
  location: String,
  latitude: Number,
  longitude: Number,
  category: String,
  text: String,
  price: Number
});

const Day = mongoose.model("Day", activitySchema);

module.exports = Day;



