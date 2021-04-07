const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./bc");

const { sendEmail } = require("./ses");
// const { upload } = require("./s3");
const cryptoRandomString = require("crypto-random-string");

const { addUser, userLogin, verifyEmail, insertCode } = require("./db");

app.use(
    cookieSession({
        secret: `what kind of key`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//you should use compression in every server you ever create!!
//it minimizes/compresses the size of every response we send
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use(express.static(path.join(__dirname, "..", "client", "public")));

///////////////////GET ROUTE FOR THE REGISTRATION////////////////////
///REQUIRE COOKIE SESSION MIDDLEWARE FIRST
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/register", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    }
    const { first, last, email, password } = req.body;
    const timestamp = new Date();
    if (!first || !last || !email || !password) {
        return res.json({ error: true });
    }
    hash(password).then((hash) => {
        console.log("hashed password:", hash);
        addUser(first, last, email, hash, timestamp)
            .then((data) => {
                console.log("hashed password:", hash);
                req.session.userId = data.rows[0].id;
                // res.cookie("userId", data.rows[0].id);
                // req.session.first = data.rows[0].first;
                // req.session.last = data.rows[0].last;
                // res.session.signatureId = null;
                // res.redirect("/");
                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                console.log(err, "error in post register");
                res.json({ success: false });
            });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body.password, "password");
    if (req.session.userId) {
        res.redirect("/");
    }
    if (!email || !password) {
        return res.json({ error: true });
    }

    userLogin(email)
        .then((result) => {
            const { password } = req.body;
            compare(password, result.rows[0].password).then((match) => {
                if (match) {
                    req.session.userId = result.rows[0].id;
                    // const user = result.rows[0].id;
                    res.json({ success: true });
                } else {
                    res.json({
                        success: false,
                        error: true,
                        alert:
                            "Seems like you entered the wrong password. Please try again!",
                    });
                }
            });
        })
        .catch((err) => {
            console.log("wrong email", err);
            res.json({
                success: false,
                error: true,
                alert: "please enter a valid email adress!",
            });
        });
});

app.post("/resetpassword/start", (req, res) => {
    const { email } = req.body;
    console.log(req.body, "this is req.body in resetpassword post");
    if (!email) {
        res.json({
            error: true,
        });
    }
    verifyEmail(email).then((result) => {
        let emailfromDB = result.rows[0].email;
        console.log(result.rows[0].email);
        if (emailfromDB) {
            const code = cryptoRandomString({
                length: 6,
            });

            insertCode(code, email)
                .then((result) => {
                    console.log(result);
                    sendEmail(email, code, "Reset Password");
                    res.json({
                        success: result,
                    });
                })
                .catch((err) => {
                    console.log("err in post resetpassword", err);
                    res.json({
                        error: true,
                    });
                });
        }
    });
});
////////////////////////////////////////LOGOUT////////////////////////////////////
app.get("/logout", (req, res) => {
    req.session = null;

    res.redirect("/login");
});

//NEVER DELETE THIS ROUTE
//NEVER COMMENT THIS ROUTE OUT
//WHEN THE USER GOES TO LOCALHOST: 3000, THIS ROUTE RUNS
//and it sends the HTML file back as a response
//CATCH ALL ROUTE =>>>>>> THIS MUST BE THE LAST ROUTE BEFORE APP.LISTEN!!!!!!!!!!
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

//inside of server directory => ALL server-side code
// SQL, db, POST, GET routes all in this directory
