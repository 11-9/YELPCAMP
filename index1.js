const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./AppError");

app.use(morgan("tiny"))
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method.toUpperCase(), req.path);
    next();
})

app.use("/dogs", (req, res, next) => {
    console.log("I LOVE DOGS!")
    next();
})

const verifyPassword = (req, res, next) => {
    const {password} = req.query;
    if (password === "gulabjamun") {
        next();
    }
    //res.send("sorry wrong password!!")
    throw new AppError("Password required!", 401);
}

/*app.use((req, res, next) => {
    console.log("this is my first middleware!!")
    next();
    console.log("this is my first middleware - after calling next!!")
})

app.use((req, res, next) => {
    console.log("this is my second middleware!!")
    return next();
})*/    

app.get("/", (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send("Home Page!")
})

app.get("/error", (req, res) => {
    chicken.fly()
})

app.get("/dogs", (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send("WOOF WOOF!!")
})

app.get("/secret", verifyPassword, (req, res) => {
    res.send("MY SECRET IS: I AM BATMAN!!")
})

app.get("/admin", (req, res) => {
    throw new AppError("YOU are not an Admin!", 403)
})

app.use((req, res) => {
    res.status(404).send("NOT FOUND!")
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Something Went Wrong" } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log("app is running on localhost:3000")
})