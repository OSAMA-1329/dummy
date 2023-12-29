const mongoose = require("mongoose");


async function connectToDb() {
    await mongoose.connect("mongodb://127.0.0.1:27017/AssignMentorStudent").then((res) => console.log("Db connections is successful")).catch((e) => console.log(e))
}

module.exports = {
    connectToDb
}