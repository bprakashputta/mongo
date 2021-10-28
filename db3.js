const mongoose = require('mongoose');
const mongoLog = require('debug')('mongo:log');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>{
        mongoLog("Connected to MongoDB");
    })
    .catch((error)=>{
        mongoLog("Ran into Error: ", error.message);
    });

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model('Course', courseSchema);
async function displayCourses(){
    const courses = await Course
        .find({isPublished: true})
        .or([{price: {$gte: 15} }, {name: /.*by.*/}]);
    mongoLog(courses)
}

displayCourses();
