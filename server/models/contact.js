var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var thing = new Schema({
  thingone: { type: String},
  thingtwo: { type: String},
});

module.exports = mongoose.model("thing", thing)
