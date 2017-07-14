//User Model
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  trips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;