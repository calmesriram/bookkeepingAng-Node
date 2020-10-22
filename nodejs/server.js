const mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("listening");
});


mongoose.connection.on('connected', function () {
    console.log('Connection to Mongo established.');
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
        mongoose.connection.db = mongoose.connection.client.db("bookkeeping20201");
    }
});
mongoose.connect("mongodb+srv://nillafruitssalem:nillafruitssalem@cluster0-qp8wu.mongodb.net/",
    { dbName: "bookkeeping20201", useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).catch(err => {
        if (err) {

            console.log("TEST", err)
            return err;
        }
    })

var Book = require('./schema/product')
var User = require('./schema/user');

app.get("/", (req, res) => {
    res.send("Connected");
    res.end();
})

// user login/reg
app.post("/Login", (req, res) => {
    User.find({ "Email": req.body.Email }).then(data => {
        console.log("**",data)
        console.log("**",data.length)
        if (data.length == 0) {
            return res.json({ status: false, msg: "not a  user" })
        }
        if (data.length != 0) {
            return res.json({ status: true, msg: "login success" })
        }
    }).catch(e => {
        console.log(e)
        res.end();
    })
})
app.post("/Reg", (req, res) => {

    const user = new User({
        Email: req.body.Email
    })
    user.save((err, data) => {
        if (err) {
            console.log(err, "while saving user");
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, msg: "User created successfull" })
        }
    })

})

// sareeproduct
app.post("/Book", (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        bookname: req.body.bookname,
        duedate: req.body.duedate,
    })
    book.save((err, data) => {
        if (err) {
            console.log(err, "while saving saree");
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, msg: "Record created successfull" })
        }
    })
})

app.get("/Book", (req, res) => {
    Book.find({}, (err, data) => {
        if (err) {
            return res.json({ status: false, msg: err })
        }
        if (!err) {
            return res.json({ status: true, data: data })
        }
    })
})


app.put("/Book/:bookid", (req, res) => {
    Book.findOneAndUpdate(
        { "bookid": req.params.bookid },
        {
            "title": req.body.title,
            "author": req.body.author,
            "summary": req.body.summary,
            "isbn": req.body.isbn,
            "bookname": req.body.bookname,
            "duedate": req.body.duedate,
        }).then(data => {
            console.log(data)
            return res.json({ status: true, msg: "Updated successfully" })
        }).catch(err => {
            return res.json({ status: false, msg: err })
        })
})

app.delete("/Book/:bookid", (req, res) => {
    console.log(req.params.bookid)
    Book.findOneAndDelete(
        { "sareecode": req.params.bookid }).then(data => {
            return res.json({ status: true, msg: "Deleted successfully" })
        }).catch(err => {
            return res.json({ status: false, msg: err })
        })
})

