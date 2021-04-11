const express = require("express");
const app = express();
const compression = require("compression");

const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./bc");
const { upload } = require("./s3");

/////////////////////////////MULTER//** Do not touch this code **//////////////////////////////
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
///////////////////////////////////** Do not touch this code **////////////////////////////

const { sendEmail } = require("./ses");

const cryptoRandomString = require("crypto-random-string");

const {
    addUser,
    userLogin,
    verifyEmail,
    insertCode,
    getCode,
    updatePassword,
    getUserData,
    addProfilePic,
    writeBio,
} = require("./db");

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

///////////////////GET ROUTE FOR THE REGISTRATION/WELCOME PAGE////////////////////
///REQUIRE COOKIE SESSION MIDDLEWARE FIRST
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});
////////////////////////////////////REGISTRATION///////////////////////////
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
///////////////////////////////////////LOGIN///////////////////////////////////
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

/////////////////////////////////////UPDATE PASSWORD/////////////////////////////////////
app.post("/resetpassword/start", (req, res) => {
    const { email } = req.body;
    console.log(req.body, "this is req.body in resetpassword post");
    if (!email) {
        res.json({
            error: true,
        });
    }
    verifyEmail(email)
        .then((result) => {
            let emailfromDB = result.rows[0].email;
            console.log(result.rows[0].email);
            if (emailfromDB) {
                const code = cryptoRandomString({
                    length: 6,
                });

                insertCode(code, email)
                    .then((result) => {
                        console.log(result, "this is mi result in insertCode");
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
        })
        .catch((err) => {
            console.log("could not find the email: ", err);
            res.json({
                error: true,
            });
        });
});
app.post("/resetpassword/verify", (req, res) => {
    const { code, email, password } = req.body;
    console.log("email in resetpassword/verify: ", email);
    if (!code || !password) {
        res.json({
            error: true,
        });
    }
    getCode(email)
        .then((result) => {
            console.log("result in getCode: ", result);
            if (result.rows[0].code !== code) {
                res.json({
                    error: true,
                });
            }
            if (result.rows[0].code === code) {
                hash(password).then((hash) => {
                    updatePassword(hash, email)
                        .then((results) => {
                            res.json({
                                success: results,
                            });
                        })
                        .catch((err) => {
                            console.log("err updating password: ", err);
                        });
                });
            }
        })
        .catch((err) => {
            console.log("err in getting email in reset password: ", err);
        });
});
/////////////////////////////////////////APP//////////////////////////////////////

///////////GET USER INFO/////////////

app.get("/user", (req, res) => {
    getUserData(req.session.userId).then((result) => {
        console.log("Result in get /user: ", result);
        res.json(result.rows[0]);
    });
});
//////////////////////POST UPLOADER//////////////////
app.post("/upload", uploader.single("file"), upload, (req, res) => {
    const { userId } = req.session;

    let url = "https://s3.amazonaws.com/kathisimageboard/" + req.file.filename;

    if (req.file) {
        addProfilePic(userId, url)
            .then((result) => {
                console.log("Result in post upload: ", result);
                res.json({
                    success: true,
                    result,
                });
            })
            .catch((err) => {
                console.log("Error in post upload", err);
            });
    } else {
        res.json({
            success: false,
            error: true,
        });
    }
});
//////////////////////////////////BIO////////////////////////////////////

app.post("/bio", (req, res) => {
    writeBio(req.session.userId, req.body.bio)
        .then((result) => {
            console.log("Result in /bio: ", result.rows[0]);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("Error in post/bio: ", err);
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
