const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb+srv://mydb:keynavas123@cluster0.xqlmp.mongodb.net/eazy9as?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err.message));
};

module.exports = connectDB;