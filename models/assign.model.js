const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
  mentorName: {
    type: String,
    required: true
  },
  assignStudent: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student"
    }
  ]

});

module.exports = mongoose.model("Mentor", mentorSchema);