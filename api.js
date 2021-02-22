const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Dueytp42069@hackeramp.niw0d.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`Connected to MongoDB!`)
 }).catch(err=>{
     console.log(`db error ${err.message}`);
     process.exit(-1)
 });

module.exports = mongoose;
