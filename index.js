import express from "express";
import { MongoClient } from "mongodb";

// const express = require("express");
// const { MongoClient } = require("mongodb");
const app = express();


const PORT = 4001;

app.use(express.json());


const MONGO_URL = "mongodb://127.0.0.1";
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected!!!");


//1.API to create Mentor
app.get("/Mentor", async function(request,response){
    const mentor = await client.db("Mongo-node").collection("Mentor").find({}).toArray();
    response.send(mentor);
})

app.get("/Mentor/:id", async function(request,response){
    const {id} = request.params;
    console.log(id);
    const getId = await client.db("Mongo-node").collection("Mentor").findOne({id : id});
    response.send(getId);
})

app.post("/Mentor", async function(request,response){
    const data = request.body;
    const mentor = await client.db("Mongo-node").collection("Mentor").insertMany(data);
    response.send(mentor);
})


//2.API to create Student
app.get("/Student", async function(request,response){
    const mentor = await client.db("Mongo-node").collection("Student").find({}).toArray();
    response.send(mentor);
})

app.post("/Student", async function(request,response){
    const data = request.body;
    const mentor = await client.db("Mongo-node").collection("Student").insertMany(data);
    response.send(mentor);
})




//3.Write API to Assign a student to Mentor
//a.Select one mentor and Add multiple Student 
//b.A student who has a mentor should not be shown in List

app.put("/Assign", async function(request,response){
    const id = request.query.id;
    console.log(request.body);
    console.log(id);
    const assign = await client.db("Mongo-node").collection("Mentor").updateOne({_id : id}, {$addToSet:{student: request.body.name}}) 
    response.send(assign);
})


app.listen(PORT, ()=> console.log(`The server started ${PORT} ✨✨`));