//Trip Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    tripname: String,
    num_days: Number,
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
