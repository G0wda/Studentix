import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter student name"]
    },
    usn:{
        type:String,
        required: [true, "Please enter student USN"]
    },
    addmissionNumber: {
        type:Number,
        required:[true, "Please enter addmission number"]
    },
    gender:{
        type: String,
        required:[ true, "Please enter gender"]
    },
    semester:{
        type: String,
        required:[ true, "Please enter semester"]
    },
    section:{
        type: String,
        required:[ true, "Please enter section"]
    },
    branch:{
        type: String,
        required:[ true, "Please enter branch"]
    },
    mobile_number:{
        type: String,
        required:[ true, "Please enter mobile number"]
    },
    adharnumber:{
        type: String,
        required:[ true, "Please enter adhar number"]
    },
    dateOfAdmissionname:{
        type: String,
        required:[ true, "Please enter Date of Admission "]
    },
    nationality:{
        type: String,
        required:[ true, "Please enter nationality"]
    },
    kcet:{
        type: String,
        required:[ true, "Please enter KCET ranking"]
    },
    comed_k:{
        type: String,
        required:[ true, "Please enter COMED-K Ranking"]
    },
})


const StudentData = mongoose.model('StudentData',StudentSchema);

export default StudentData;