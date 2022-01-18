//MAIN BACKEND FILE with mOngo DB database
require('dotenv').config()

//const db = require("./database/index.js");
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel =  require("./database/publications");

const express = require("express");
const app = express();
app.use(express.json()); //express.json is built in middle ware function in express it parses incoming requrest with json payloads and based on body parcels.

//Import mongoose module
var mongoose = require('mongoose');
//set up defalult mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));


//GET API

//http://localhost:3000/
app.get("/",(req,  res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`}); //can also use res.json in place of res.send
});

//http://localhost:3000/books
app.get("/books", async (req,  res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks); 
});

//http://localhost:3000/book-isbn/12345ONE
app.get("/book-isbn/:isbn", async (req,  res) => {
  const{isbn} = req.params;
  const getSpecificBook = await BookModel.findOne({ISBN:isbn});
  if(getSpecificBook===null){
      return res.json({"error": `No Book found for the ISBN of ${isbn}`});
  }
  return res.json(getSpecificBook);
});

//http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req,  res) => {
    const{category} = req.params;
    const getSpecificBooks = await BookModel.find({category:category});
    if(getSpecificBooks.length===0){
        return res.json({"error": `No Book found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

//http://localhost:3000/authors
app.get("/authors", async(req,  res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors); 
});

//http://localhost:3000/author-id/shivansh
app.get("/author-id/:id", async (req,  res) => {
    const{id} = req.params;
    const getSpecificAuthor = await AuthorModel.findOne({id:id});
    if(getSpecificAuthor===null){
        return res.json({"error": `No Book found for the name of ${id}`});
    }
    return res.json(getSpecificAuthor);
});

//http://localhost:3000/author-isbn/12345Two
app.get("/author-isbn/:isbn", async(req,  res) => {
        const{isbn} = req.params;
        const getSpecificAuthors = await AuthorModel.find({books:isbn});
        if(getSpecificAuthors.length===0){
            return res.json({"error": `No Author found for the category of ${isbn}`});
        }
        return res.json(getSpecificAuthors);
});

//http://localhost:3000/publications
app.get("/publications", async(req,  res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications); 
});

//http://localhost:3000/publication-id/1
app.get("/publication-id/:id", async(req, res) => {
    let{id} = req.params;
    id=Number(id);
    const getSpecificPublications = await PublicationModel.find({id:id});
    if(getSpecificPublications===null){
        return res.json({"error": `No Book found for the publication of ${name}`});
    }
    return res.json(getSpecificPublications);

});

//POST API

//http://localhost:3000/book
app.post("/book", async (req,  res) => {
    const addNewBook = await BookModel.create(req.body);
    return res.json({
        bookAdded: addNewBook,
        message: "Book was added !!"
    });
});

//http://localhost:3000/author
 app.post("/author", async (req,  res) => {
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({
        authorAdded: addNewAuthor,
        message: "Author was added !!"
    });
});


//http://localhost:3000/publication
app.post("/publication",(req,  res) => {
    db.publications.push(req.body);
    return res.json(db.publications);
});

//PUT APIs

//http://localhost:3000/book-update/12345Seven
app.put("/book-update/:isbn", async(req,  res) => {
    const{isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn},req.body,{new: true});
    return res.json( {bookUpdated: updateBook, message: "Book was updated!!!"});

});

//http://localhost:3000/author-update/4
app.put("/author-update/:id", async(req,  res) => {
    const{id} = req.params;
    const updateAuthor = await AuthorModel.findOneAndUpdate({id : id},req.body,{new: true});
    return res.json( {authorUpdated: updateAuthor, message: "Author was updated!!!"});
   
});

//http://localhost:3000/publication-update/1
app.put("/publication-update/:id",async(req,  res) => {
    const{id} = req.params;
    const updatePublication = await PublicationModel.findOneAndUpdate({id : id},req.body,{new: true});
    return res.json( {publicationUpdated: updatePublication, message: "Publication was updated!!!"});
   
   
});

//DELETE API

//http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", async (req,  res) => {
    const{isbn}=req.params;
    const deleteBook = await BookModel.deleteOne({ISBN: isbn});
    return res.json( {bookDeleted: deleteBook, message: "Book was deleted!!!"});
    
});

//http://localhost:3000/book-author-delete/12345Two/1
app.delete("/book-author-delete/:isbn/:id", async(req,  res) => {
    const{isbn, id}=req.params;
    let getSpecificBook = await BookModel.findOne({ISBN: isbn});
    if(getSpecificBook===null){
        return res.json({"error": `No Book Found for the ISBN of ${isbn}`});
    }
    else{
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, getSpecificBook, {new: true});
        return res.json( {bookUpdated: updateBook, message: "Author was deleted from book!!!"});
    }
    
});

//http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn",(req,  res) => {

});

app.listen(3000 , () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});


