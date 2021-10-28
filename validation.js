const mongoose = require('mongoose');
const mongoLog = require('debug')('mongo:log');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>{
        mongoLog("Connected to MongoDB");
    })
    .catch(error => console.log("Couldn't connect to MongoDB: ",error.message));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225
    },
    category: {
        type: String,
        required: true,
        enum:['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        //custom validator
        // validate: {
        //     validator: function (v){
        //         return  v && v.length>0;
        //     },
        //     message: 'A course should have atleast one tag'
        // }

        // Async Validation
        validate:{
            isAsync: true,
            validator: function (v, callback){
                setTimeout(()=>{
                    const result = v && v.length>0;
                    callback(result)
                }, 4000);
            },
            message: 'A course should have atleast one tag'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function (){ return this.isPublished;},
        min: 10,
        max: 200,
        get: (v)=> Math.round(v),
        set: (v)=> Math.round(v)
    }
});
//Create Course model that we use to create course objects
const Course = mongoose.model('Course', courseSchema);


// console.log(courseSchema);
async function createCourse() {
    const course = new Course({
        name: "Angular Course",
        category: 'web',
        author: "Bhanu",
        tags: ['frontend'],
        isPublished: true,
        price: 11.997
    });
    try {
        // This is an built-in validator
        // await course.validate();

        const result = await course.save();
        mongoLog("Hi: ",result);
    }catch (ex){
        mongoLog(ex.message);
    }
}

// Create Course
// createCourse();



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
        .find({_id: '617a7c2fa0dd003f4451e30e'})
        .sort({name: 1})
        .select({name: 1, price: 1, tags: 1, author: 1});
    // .count();
    mongoLog(courses);
}


// Query Course
getCourses();