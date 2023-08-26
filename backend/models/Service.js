const mongoose = require("mongoose");

const ServiceSchema = new mongoose({
  text: {
    type: String,
    required: true,
  },
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = {
  Service,
};
