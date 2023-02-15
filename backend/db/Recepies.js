const mongoose = require("mongoose");

const recepiesSchema = new mongoose.Schema({
  recipeImageUrl: { type: String, default: "" },
  title: { type: String, required: true },
  category: { type: String, required: true },
  prepTime: { type: String, required: true },
  numPeople: { type: Number, required: true },
  description: { type: String, required: true },
  recepie: { type: String, required: true },
  userId: { type: String, required: true },
  createdOn: { type: Date, new: Date(Date.UTC(2012, 11, 20)) },
  numOfVotes: { type: Number },
  ratings: { type: Array },
});

module.exports = mongoose.model("recepies", recepiesSchema);
