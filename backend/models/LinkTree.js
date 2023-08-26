const mongoose = require("mongoose");

const LinkTreeSchema = new mongoose.Schema({
  demoLink: {
    type: String,
  },
  iosLink: {
    type: String,
  },
  playStoreLink: {
    type: String,
  },
  websiteLink: {
    type: String,
  },
});

const LinkTree = mongoose.model("LinkTree", LinkTreeSchema);

module.exports = {
  LinkTree,
};
