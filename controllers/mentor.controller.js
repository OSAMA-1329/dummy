const { CREATE_NEW_MENTOR, GET_ALL_MENTORS, ASSIGN_STUDENTS, SHOW_ALL_STUDENTS } = require("../routers/action.router");

const mentorRouter = require("express").Router();

mentorRouter.get("/", GET_ALL_MENTORS)                  //  get all mentors
    .post("/create", CREATE_NEW_MENTOR)                 //  create mentor
    .get("/:id", SHOW_ALL_STUDENTS)                     //  show all students for a particular mentor 
    .put("/assign/:id", ASSIGN_STUDENTS)                //  assign a student to mentor
module.exports = mentorRouter