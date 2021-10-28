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
        .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
        .sort({price: -1})
        .select({name: 1, author: 1, price: 1});

   mongoLog(courses);
}

displayCourses();
