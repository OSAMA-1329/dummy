const { CREATE_NEW_STUDENT, GET_ALL_STUDENTS, ASSIGN_OR_CHANGE_MENTOR, PREVIOUS_MENTOR } = require("../routers/action.router");

const studentRouter = require("express").Router();

studentRouter.get("/", GET_ALL_STUDENTS)                    //       get a student lists
    .post("/Create", CREATE_NEW_STUDENT)                     //      Create a student
    .put("/AssignorChange/:id", ASSIGN_OR_CHANGE_MENTOR)     //      Assign or change a mentor
    .get('/previousMentor/:id', PREVIOUS_MENTOR)             //      previously assigned mentor for a particular student.

module.exports = studentRouter