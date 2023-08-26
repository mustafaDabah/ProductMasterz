const mongoose = require("mongoose");

const WebinarSchema = new mongoose.Schema({
  lang: {
    type: String,
    unique: true,
    required: true,
  },
  navbar: [
    {
      text: String,
      link: String,
    },
  ],
  header: {
    title: String,
    subtitle: String,
    description: String,
    imageUrl: String,
  },
  about: {
    content: String,
    boldContent: String,
  },
  aboutLecturer: {
    title: String,
    subtitle: String,
    description: String,
    imageUrl: String,
  },
});

const Webinar = mongoose.model("Webinar", WebinarSchema);

module.exports = { Webinar };
