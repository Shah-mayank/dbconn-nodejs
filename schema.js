const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    subjectId:{type:String},
    qcStatus: { type: Boolean, default: null },
    provider: { type: Number },
    env: { type: Number },
    trialID: { type: Number },
    hospital: { type: String },
    processes: { type: Array },
    disorder: { type: String },
    executionID: { type: String },
    studyID: { type: String },
    patientID: { type: String }
});
module.exports = mongoose.model("User", userSchema);