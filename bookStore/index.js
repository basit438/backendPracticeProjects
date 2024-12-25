// const express = require("express");

import express from "express";

import "dotenv/config";

import mongoose from "mongoose";
 const app = express();

 app.get("/", (req, res) => {
  res.send("Hello World");
 });

 const port = process.env.PORT;


 async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODBURL)
         app.listen(port, () => {
             console.log("Server started on port " + port);
            });
         
      } catch (error) {
         console.log(error);
      };
 }

 startServer();

 const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
 });

 const Book = mongoose.model("Books", BookSchema);

 // Api paths

// Api to fetch all books 
app.get("/api/get/books",async (req, res) => {
    const allBooks = await Book.find();
    res.send(allBooks);
});

// Api to add a new book
app.post("/api/add/book", (req, res) => {

});

// Api to update a book
app.put("/api/update/book", (req, res) => {

});


// Api to delete a book
app.delete("/api/delete/book", (req, res) => {

});



