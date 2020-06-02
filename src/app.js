const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");

// Define paths for express config
const publicFolderPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); // Partials registration command to run: nodemon app.js -e hbs,js

// Setup static directory to serve
app.use(express.static(publicFolderPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Akshay"
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Akshay"
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text",
        title: "Help",
        name: "Akshay"
    });
});
app.get("/weather", (req, res) => {
    // if(!req.query.address) {
    //     return res.send({
    //         error: "You have to enter the address"
    //     })
    // }
    // res.send({
    //     foreCast: "Rain",
    //     location: "Abc",
    //     address: req.query.address
    // });
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        foreCast(latitude, longitude, (error, data) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                foreCastData: data,
                location,
                address: req.query.address
            })
        })
    });
});
app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You have to enter the search item"
        })
    }
    res.send({
        products: []
    });
});
app.get("/help/*", (req, res) => {
    res.render("page-not-found", {
        errorMsg: "Help article not found",
        name: "Akshay",
        title: "404"
    });
});
app.get("*", (req, res) => {
    res.render("page-not-found", {
        errorMsg: "No page found",
        name: "Akshay",
        title: "404"
    });
});
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});