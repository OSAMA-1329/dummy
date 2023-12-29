const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    mentorName: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Mentor"
    }],
    previousMentor: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Mentor"
    }]
});

module.exports = mongoose.model("Student", studentSchema);