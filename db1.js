const mongoose = require('mongoose');
const mongoLogger = require('debug')('mongo:log');

mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(()=>{
        console.log("Connected to Mongo-Excercises Database");
    })
    .catch(error => {
        console.log("Couldn't connect to database: ", error.message);
    });

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model("Course", courseSchema);

// async function createCourses(){
//     const course
// }

async function getCourses(){
    const course = await Course
        .find({isPublished: true, tags: 'backend'})
        .sort({name: 1})
        .select({name: 1, author: 1});
    mongoLogger(course);
}

getCourses();