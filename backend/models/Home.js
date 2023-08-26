const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
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
    description: String,
    imageUrl: String,
  },
  about: {
    content: String,
    boldContent: String,
  },
  services: {
    title: String,
    items: {
      type: Array,
    },
  },
});

const Home = mongoose.model("Home", HomeSchema);

module.exports = { Home };
