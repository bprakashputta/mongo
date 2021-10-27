const mongoose = require('mongoose');
const mongoLog = require('debug')('mongo:log');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>{
        mongoLog("Connected to MongoDB");
    })
    .catch(error => console.log("Couldn't connect to MongoDB: ",error.message));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});
//Create Course model that we use to create course objects
const Course = mongoose.model('Course', courseSchema);


// console.log(courseSchema);
async function createCourse() {
    const course = new Course({
        name: "Angular Course",
        author: "Bhanu",
        tags: ["angular", "frontend"],
        isPublished: true
    });
    const result = await course.save();
    mongoLog(result);
}

async function getCourses(){
    // Query Courses
    const courses = await Course
        // find courses with the given parameters
        // .find({author: "Bhanu", tags: "angular"})

        // courses with price
        // .find({price: 10})
        // .find({price: {$gt: 10}})
        // .find({price: {$lte: 10}})
        // find courses with condition
        .find({name: /course$/i})
        .or([{author: "Bhanu"}, {isPublished: true}])
        .limit(10)
        .sort({name: 1})
        .select({name: 1});
        // .count();
    mongoLog(courses);
}

// Create Course
// createCourse();

// Query Course
getCourses();