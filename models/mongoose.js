const mongoose = require('mongoose');

// main().catch(err => console.log(err));

exports.MongooseConnect = async function main() {
    try{
        await mongoose.connect('mongodb+srv://ahmed:Ahmed1234@cluster0.in4qx.mongodb.net/Fyp-Management')
        console.log('Mongoose connected ')
    }catch(err) {
        console.log(err,'mongoose error ')
    }
}


// const dbURI = "mongodb+srv://ahmed:Ahmed1234@cluster0.in4qx.mongodb.net/test";

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(result => app.listen(3000))
//   .catch(err => console.log(err));