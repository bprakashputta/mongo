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

async function deleteCourse(id){
    // const result = await Course.deleteOne({_id: id});

    // Delete many
    // const result = await Course.deleteMany({_id: id});

    // Delete course and return that course
    const result = await Course.findByIdAndDelete({_id: id});
    mongoLog(result);
}

deleteCourse('617a469ef43fb7d43b7d8d8b');