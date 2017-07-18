//Day Model
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const daySchema = new Schema({
  day_name: String,
  date: Date,
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activities' }]
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;