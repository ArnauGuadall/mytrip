//Trip Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    tripname: String,
    num_days: Number,
    dayID: [{ type: Schema.Types.ObjectId, ref: 'Day' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
