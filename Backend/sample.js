import express from "express";

const app = express();

app.get("/home", (req, res) => {
    const query = req.query
    res.json(
       query
    )
})

app.listen(3000,()=>console.log("runing"))