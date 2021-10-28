const mongoose = require('mongoose');
const mongoLog = require('debug')('mongo:log');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>{
        mongoLog('Connected to MongoDB');
    })
    .catch(error =>{
        mongoLog("Ran into error: ", error.message);
    });

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
});

const Course = new mongoose.model('Course', courseSchema);

async function updateCourse1(id){
    const course = await Course.findById(id);
    mongoLog(course);
    if(!course){
        mongoLog("Course with given id does not exist");
        return;
    }

    course.author = "Bhanu";
    const result = await course.save();
    mongoLog(result);
}

async function updateCourse2(id){
    const result = await Course.findByIdAndUpdate(id,{
        $set:{
            author: "Tharun",
            isPublished: "true"
        }
    }, {new: true});
    mongoLog( result );
}


updateCourse2('617a469ef43fb7d43b7d8d8b');