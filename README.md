# MongoDB

## Database:- 
MongoDB stores data in the form JSON objects, unlike relational databases 
that store data in the form of Tables.
## Collection
Like tables in Relational databases, collections are collections JSON documents/objects in MongoDB.

## Document
Like rows in Relational databases, document is a row of JSON object. 

## Mongoose
There are two clients for using MongoDB in NodeJs, they are Mongoose and MongoClient.
MongoClient is a complex version of the MongoDB with core properties included. Mongoose 
is a simple client for getting started and creating mongo collections in NodeJs.

    const mongoose = require('mongoose');
    
    mongoose.connect('mongodb://localhost/playground')
    .then(()=>{
        mongoLog("Connected to MongoDB");
    })
    .catch(error => {
        console.log("Couldn't connect to MongoDB: ",error.message)
    });

## Schema Object
As MongoDB stores information in the form of JSON objects, 
we need to store the data as key-value pairs, and maintain a schema for
creating the collection object.

    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: {type: Date, default: Date.now},
        isPublished: Boolean
    });

## Create a Document




#   m o n g o  
 