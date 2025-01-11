require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));

const API_KEY = process.env.API_KEY;

function fetchNews(url,res){
    axios.get(url)
    .then(reaponaw => {
        if(response.data.totalResult > 0){
            res.json({
                status:200,
                success:true,
                message:"Succesfully Fetched the data",
                data:response.data
            });
        }
    })
}