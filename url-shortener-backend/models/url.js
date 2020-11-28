const mongoose = require("mongoose");

// Destructure Schema from mongoose
const { Schema, model } = mongoose;

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortened: {
    type: String,

    minlength: 5,
    maxlength: 5,
  },
});

const UrlModel = model("url", urlSchema);

module.exports = UrlModel;
