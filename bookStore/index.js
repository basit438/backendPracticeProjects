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



 