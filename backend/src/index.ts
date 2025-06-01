import {initserver} from "./app/init";
import express from "express";
async function init() {
    const app = await initserver();
    app.use(express.json())

    app.use("/",(req,res)=>{
  res.send("working")
})
        app.listen(8080,()=>{
        console.log("working on port 8080")
    })
}
init();