let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:8080');
let db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));

const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    pwd: String
});

let articleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        default: ''
    },
    content: String,
    hContent: String,
    time: String
});

 let categorySchema = new Schema({
     name: {
         type: String,
         unique: true
     }
 });

let workSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    link: String,
    demo: String,
    description: String,
    img: String
});

// let commentSchema = new Schema({
//
// })

// let imgSchema = new Schema({
//     file:
// });

let Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  Category: mongoose.model('Category', categorySchema),
  Work: mongoose.model('Work', workSchema)
  // Img: mongoose.model('Img', imgSchema)
}

// let user = new Models.User({
//     name: 'joshua',
//     pwd: 'shihao1996'
// });
// user.save();

module.exports = Models;
