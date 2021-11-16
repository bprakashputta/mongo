const mongoose = require('mongoose');
const {add} = require("nodemon/lib/rules");

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: {
    type: [authorSchema],
    required: true
  }
}));


async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

// createCourse('Node Course',
//     [ new Author({ name: 'Mosh' }),
//       new Author({ name: 'Jhon' }),
//       new Author({ name: 'Bhanu' }),
//     ]
// ).then(()=>{
//   console.log('Course Created')
// }).catch(error=>{
//   console.log("Error: ", error.message);
// });

async function updateCourse(id){
  const courses = await Course.findById(id);
  courses.author.name = 'Bhanu';
  const result = await courses.save();
  console.log(result);
}

// updateCourse('617b7ca3c678aa46ecd452a8');


async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  const result = await course.save();
  console.log(result);
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = await course.authors.id(authorId);
  await author.remove();
  await course.save();
}

// addAuthor('617b83ef49bc2f33147ee74c', new Author({ name: 'Tharun' }));

removeAuthor('617b83ef49bc2f33147ee74c', '617b83ef49bc2f33147ee74b');