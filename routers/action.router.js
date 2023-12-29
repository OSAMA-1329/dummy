const Mentormodels = require('../models/assign.model');
const Studentmodels = require('../models/student.model');
const mongoose = require("mongoose");


//  get all mentor and student data's
async function GET_ALL_STUDENTS(req, res) {
    try {
        await Studentmodels.find().then((response) => {
            if (response.length < 1) {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "No students found"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "students has retrieved"
                })
            }
        }).catch((e) => {
            return res.status(402).json({
                success: false,
                error: e.message,
                message: "something went wrong"
            })
        })
    } catch (error) {
        res.status(500).send({
            message: "All students retrieved error",
            error: error.message
        })
    }
}

//  get all mentor and student data's
async function GET_ALL_MENTORS(req, res) {
    try {
        await Mentormodels.find().then((response) => {
            if (response.length < 1) {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "No mentor found"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "mentors has retrieved"
                })
            }
        }).catch((e) => {
            return res.status(402).json({
                success: false,
                error: e.message,
                message: "something went wrong"
            })
        })
    } catch (error) {
        res.status(500).send({
            message: "All mentors retrieved error",
            error: error.message
        })
    }
}

//      get all mentor data's
async function CREATE_NEW_MENTOR(req, res) {
    try {
        const newMentor = new Mentormodels(req.body);
        await newMentor.save().then((response) => {
            if (response._id) {
                return res.status(200).json({
                    success: true,
                    message: "New mentor created",
                    data: response
                })
            } else {
                throw new Error({ message: "Something went wrong" })
            }
        }).catch((err) => {
            return res.status(402).json({
                success: false,
                error: err.message,
                message: "New student error"
            })
        })
    } catch (error) {
        res.status(500).send({
            message: "New student creation error",
            error: error.message
        })
    }
}

//      get all student data's
async function CREATE_NEW_STUDENT(req, res) {
    try {
        const newStudent = new Studentmodels(req.body)
        await newStudent.save().then((response) => {
            if (response._id) {
                return res.status(200).json({
                    success: true,
                    message: "New Student created",
                    data: response
                })
            } else {
                throw new Error({ message: "New students creating error" })
            }
        }).catch((err) => {
            return res.status(402).json({
                success: false,
                error: err.message,
                message: "Mentor Student issue"
            })
        })

    } catch (error) {
        res.status(500).send({
            message: "New Student creation error",
            error: error.message
        })
    }
}

//      assign a student to mentor
async function ASSIGN_STUDENTS(req, res) {
    try {
        const { id } = req.params;
        const mentor = await Mentormodels.findOne({ _id: id });
        const student = await Studentmodels.findOne({ _id: req.body.assignStudent });
        if (!mentor) {
            return res.status(400).json({ message: "no mentors available here" })
        }

        //      mentor already assigned

        if (student.mentorName !== "" && student.mentorName !== undefined && student.mentorName !== null) {
            return res.status(400).json({ message: "mentor already assigned" });
        }

        //      add multiple students

        const assign_student = Mentormodels.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { $push: { assignStudent: req.body.assignStudent } })
        await assign_student.then((response) => {
            return res.status(200).json({
                message: "student assigned",
                data: response
            })
        }).catch((err) => {
            return res.status(402).json({
                success: false,
                error: err.message,
                message: "student not assigned"
            })
        })
        // }
    } catch (error) {
        res.status(500).send({
            message: "Student assign error",
            error: error.message
        })
    }
}

//      assign or change mentor for particular student
async function ASSIGN_OR_CHANGE_MENTOR(req, res) {
    try {
        const { id } = req.params;
        const student = await Studentmodels.findOne({ _id: id });
        if (!student) {
            return res.status(400).json({ message: "No student available here" })
        }
        const assignOrChangeMentor = Studentmodels.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, [{ $set: { mentorName: req.body.mentorName } }, { $set: { previousMentor: req.body.previousMentor } }])
        await assignOrChangeMentor.then((response) => {
            return res.status(200).json({
                success: true,
                data: response,
                message: "mentor assigned"
            })
        }).catch((err) => {
            return res.status(402).json({
                success: false,
                error: err.message,
                message: "student assigned is not done"
            })
        })
    } catch (error) {
        res.status(500).send({
            message: "mentor assign or change error",
            error: error.message
        })
    }
}

//   show all students for particular mentor
async function SHOW_ALL_STUDENTS(req, res) {
    try {
        const { id } = req.params;
        const show_all_student = Mentormodels.where({ _id: new mongoose.Types.ObjectId(id) }).populate("assignStudent")
        await show_all_student.then((response) => {
            if (response.length < 1) {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "No students found"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "student lists has retrieved"
                })
            }
        }).catch((e) => {
            return res.status(402).json({
                success: false,
                error: e.message,
                message: "show all student response error"
            })
        })
    } catch (error) {
        res.status(500).send({
            message: "Show all students error",
            error: error.message
        })
    }
}

//   show the previously assigned mentor for a particular student

async function PREVIOUS_MENTOR(req, res) {
    try {
        const { id } = req.params;
        const previousMentor = Studentmodels.find({ _id: new mongoose.Types.ObjectId(id) }, { previousMentor: 1 }).populate("previousMentor")
        await previousMentor.then((response) => {
            if (response.length < 1) {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "No students found"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    data: response,
                    message: "student lists has retrieved"
                })
            }
        }).catch((e) => {
            return res.status(402).json({
                success: false,
                error: e.message,
                message: "show all student response error"
            })
        })
    } catch (error) {
        res.status(500).send({
            message: "Show previous mentor error",
            error: error.message
        })
    }
}

module.exports = {
    GET_ALL_STUDENTS,
    GET_ALL_MENTORS,
    CREATE_NEW_MENTOR,
    CREATE_NEW_STUDENT,
    ASSIGN_STUDENTS,
    SHOW_ALL_STUDENTS,
    ASSIGN_OR_CHANGE_MENTOR,
    PREVIOUS_MENTOR
}