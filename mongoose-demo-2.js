const mongoose = require('mongoose');

mongoose.set("strictQuery", true);
mongoose.connect('mongodb://localhost:27017/test'); //OR
//mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


const kittySchema = new mongoose.Schema({
    name:String
})
kittySchema.methods.speak = function() {
    const greeting = this.name
    ? "Meow name is " + this.name
        : "I dont have a name";
    console.log(greeting);
}

const kitten = mongoose.model('Kitten', kittySchema);
const  fluffy = new kitten({name:'flutty'});
fluffy.speak();
