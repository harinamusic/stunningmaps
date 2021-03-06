const express = require("express");
const app = express();
// const server = require("http").Server(app);
// const io = require("socket.io")(server, {
//     allowRequest: (req, callback) =>
//         callback(null, req.headers.referer.startsWith("http://localhost:3000")),
// });
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
    // writeBio,
    // lastRegisteredUsers,
    // matchingUsers,
    // friendshipStatus,
    // sendFriendRequest,
    // acceptFriendRequest,
    // deleteFriendship,
    // wannabeFriends,
    // getLastTenMsg,
    // insertMessage,
    // friendsOnOtherProfile,
    insertDescription,
    getAllMarkers,
    addMarker,
    deleteMarker,
    getBioInfo,
} = require("./db");
const { id } = require("date-fns/locale");

// const { io } = require("socket.io-client");
// const { socket } = require("../client/src/socket");

app.use(
    cookieSession({
        secret: `what kind of key`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

/////////////////////////////////USE THIS CODE INSTEAD OF ABOVE!!!!!/////////////
/////////////IT GIVES SOCKET ACCESS TO OUR COOKIE SESSIONS///////
// const { response } = require("express");
// const { getAllByAltText } = require("@testing-library/react");
// const cookieSessionMiddleware = cookieSession({
//     secret: `I'm always angry.`,
//     maxAge: 1000 * 60 * 60 * 24 * 90,
// });

// app.use(cookieSessionMiddleware);
// io.use(function (socket, next) {
//     cookieSessionMiddleware(socket.request, socket.request.res, next);
// });
///////////////////////////CSURF////////////////////////////////
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
        // console.log("Result in get /user: ", result);
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
//////////UPDATE BIO - ALSO WHERE COORDINATES FIT AND NOT JUST USER ID??????////////GET BIO?????//////

// app.post("/bio", (req, res) => {
//     writeBio(req.session.userId, req.body.bio)
//         .then((result) => {
//             console.log("Result in /bio: ", result.rows[0]);
//             res.json(result.rows[0]);
//         })
//         .catch((err) => {
//             console.log("Error in post/bio: ", err);
//         });
// });

app.post("/bio/:id", (req, res) => {
    const markerId = req.params.id;
    console.log(markerId, "this needs to be the markers id");
    insertDescription(markerId, req.body.bio)
        .then((result) => {
            console.log("Result in /bio: ", result.rows[0]);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("Error in post/bio: ", err);
        });
});

///////////////////////////////////GET MARKERS///////////////////////////////////

app.get("/markers", (req, res) => {
    getAllMarkers(req.session.userId).then((result) => {
        // console.log("Result in get /markers: ", result);
        res.json(result.rows);
    });
});
////////POST MARKERS/////////////////

app.post("/setmarkers", (req, res) => {
    const { lat, lng, time } = req.body;
    console.log(req.body, "i am the body");
    addMarker(lat, lng, req.session.userId, time)
        .then((result) => {
            console.log("Result in /setmarkers ", result.rows[0]);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("Error in post/setmarkers ", err);
        });
});

//
app.post("/deletemarker/:id", (req, res) => {
    // const friendRequestSender = req.session.userId;
    const markerId = req.params.id;
    console.log(markerId);
    deleteMarker(markerId)
        .then((result) => {
            console.log("Result in /deletefriend: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error in /deletemarker: ", err);
        });
});

/////////////////////////////////////GET OTHER USER INFO//////////////////////////
app.get("/selected/:id.json", (req, res) => {
    // const { userId } = req.session;
    // console.log(userId, "this is the users id i am wqanting");
    getBioInfo(req.params.id)
        .then((result) => {
            // console.log("Result  in /user: ", result);
            // console.log("Result. rows   in /user: ", result.rows[0]);
            // console.log("id   in /user: ", result.rows[0].id);
            // console.log("req.params.id /user: ", req.params.id);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("Error in api/user/:id: ", err);
        });
});

// app.get("/user/:id/friends.json", (req, res) => {
//     const friendRequestSender = req.session.userId;
//     const friendRequestReceiver = req.params.id;
//     friendshipStatus(friendRequestReceiver, friendRequestSender).then(
//         (result) => {
//             console.log("it woeked");
//             if (result.rows[0].accepted == true) {
//                 console.log("yes we are friends");
//                 friendsOnOtherProfile(req.params.id).then((result) => {
//                     console.log("i got it", result.rows);
//                     res.json(result);
//                 });
//             }
//         }
//     );
// });

/////////////////////////////////////FIND PEOPLE///////////////////////////////

// app.get("/lastthreeusers", (req, res) => {
//     lastRegisteredUsers()
//         .then((result) => {
//             // console.log("response in /lastusers ", result);
//             res.json(result.rows);
//         })
//         .catch((err) => {
//             console.log("err in /lastusers ", err);
//         });
// });

// app.get("/users/:searchusers", (req, res) => {
//     console.log(req.params.searchusers);
//     matchingUsers(req.params.searchusers)
//         .then((result) => {
//             // console.log("result in /searchusers: ", result);
//             res.json(result.rows);
//         })
//         .catch((err) => {
//             console.log("err in /searchusers: ", err);
//         });
// });
///////////////////////////////////////FRIEDNREQUEST///////////////////////////
// app.get("/friends/:id", (req, res) => {
//     const friendRequestSender = req.session.userId;
//     const friendRequestReceiver = req.params.id;

//     console.log(friendRequestReceiver, "this is my receiever");
//     console.log(friendRequestSender, "this is my sender");

//     friendshipStatus(friendRequestReceiver, friendRequestSender)
//         .then((result) => {
//             if (result.rows == 0) {
//                 res.json({
//                     setButtonText: "Add Friend",
//                 });
//             } else if (result.rows[0].accepted == true) {
//                 friendsOnOtherProfile(req.params.id).then((result) => {
//                     console.log(result.rows, "this is my result.rows array");
//                     const friends = result.rows.filter(
//                         (friend) => friend.id !== req.session.userId
//                     );
//                     /*...*/
//                     // res.json(friends);
//                     res.json({
//                         friends,
//                         // result,
//                         setButtonText: "Unfriend",
//                     });
//                 });
//             } else if (friendRequestReceiver == result.rows[0].sender_id) {
//                 res.json({
//                     setButtonText: "Accept Friend Request",
//                 });
//             } else if (friendRequestReceiver !== result.rows[0].sender_id) {
//                 res.json({
//                     setButtonText: "Cancel Friend Request",
//                 });
//             }
//         })

//         .catch((err) => {
//             console.log("Error in GET friends/:id: ", err);
//         });
// });

// app.post("/friendrequest/:id/:buttonText", (req, res) => {
//     const friendRequestSender = req.session.userId;
//     const friendRequestReceiver = req.params.id;
//     const buttonText = req.params.buttonText;

//     if (buttonText == "Add Friend") {
//         console.log("i am adding a new friend");
//         sendFriendRequest(friendRequestReceiver, friendRequestSender)
//             .then(() => {
//                 //console.log("Result from POST friendrequest/:id: ", result);
//                 res.json({
//                     setButtonText: "Cancel Friend Request",
//                 });
//             })
//             .catch((err) => {
//                 console.log("Error in POST friendrequest: ", err);
//             });
//     } else if (buttonText == "Accept Friend Request") {
//         acceptFriendRequest(friendRequestReceiver, friendRequestSender).then(
//             () => {
//                 res.json({ setButtonText: "Unfriend" });
//             }
//         );
//     } else if (
//         buttonText == "Cancel Friend Request" ||
//         buttonText == "Unfriend"
//     ) {
//         deleteFriendship(friendRequestReceiver, friendRequestSender)
//             .then(() => {
//                 //console.log("Result in /deletefriend: ", result);
//                 res.json({
//                     setButtonText: "Add Friend",
//                 });
//             })
//             .catch((err) => {
//                 console.log("Error in /deletefriend: ", err);
//             });
//     }
// });
//////////////////////////////////FRIEND WANNABES////////////////////////////
// app.get("/friend-wannabes", (req, res) => {
//     wannabeFriends(req.session.userId).then((result) => {
//         res.json(result.rows);
//         // console.log(result.rows, "this is my result.rows in /friendwannbes");
//     });
// });
//////////////////////////////////////DELETE FRIEND////////////////////////////
// app.post("/deletefriend/:id", (req, res) => {
//     const friendRequestSender = req.session.userId;
//     const friendRequestReceiver = req.params.id;
//     deleteFriendship(friendRequestReceiver, friendRequestSender)
//         .then((result) => {
//             //console.log("Result in /deletefriend: ", result);
//             res.json(result);
//         })
//         .catch((err) => {
//             console.log("Error in /deletefriend: ", err);
//         });
// });
// app.post("/acceptfriend/:id", (req, res) => {
//     const friendRequestSender = req.session.userId;
//     const friendRequestReceiver = req.params.id;
//     acceptFriendRequest(friendRequestReceiver, friendRequestSender)
//         .then((result) => {
//             console.log(
//                 "results, receiver from /post friends/:id",
//                 result,
//                 friendRequestReceiver
//             );
//             res.json(result.rows);
//         })
//         .catch((err) => {
//             console.log("err in /acceptfriend: ", err);
//         });
// });
////////////////////////FRIENDS ON OTHER PROFILE.////////////////////

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
////CHANGE TO SERVER .listen
//inside of server directory => ALL server-side code
// SQL, db, POST, GET routes all in this directory

// //////////RUNS THE SECOND THE USER LOGGES IN
// io.on("connection", (socket) => {
//     console.log(`socket id ${socket.id} is now connected`);
//     //     //we only want to do sockets when a user is logged in
//     const userId = socket.request.session.userId;
//     if (!socket.request.session.userId) {
//         return socket.disconnect(true);
//     }

//     ///HERE RETRIEVE THE LAST 10 MESSAGES
//     getLastTenMsg().then((data) => {
//         // console.log(data.rows.reverse());
//         io.sockets.emit("chatMessages", data.rows.reverse());
//     });
//     // io.emit("achtung", {
//     //     warning: "This site will go offline for maintenance in one hour.",
//     // });

//     socket.on("newMessage", (newMsg) => {
//         // console.log("this message: ", newMsg);
//         // console.log("from user: ", userId);

//         insertMessage(userId, newMsg)
//             .then(() => {
//                 getUserData(userId)
//                     .then((data) => {
//                         let infoMsg = {
//                             first: data.rows[0].first,
//                             last: data.rows[0].last,
//                             profile_pic: data.rows[0].profile_pic,
//                             message: newMsg,
//                         };
//                         io.sockets.emit("chatMessage", infoMsg);
//                     })
//                     .catch((err) => {
//                         console.log(
//                             "err in getting user data from socket.on: ",
//                             err
//                         );
//                     });
//             })
//             .catch((err) => {
//                 console.log("err in inserMessage: ", err);
//             });
//     });
// });
// io.on("connection", (socket) => {
//     console.log(`A socket with the id ${socket.id} just CONNECTED`);
//     socket.emit("welcome", {
//         msg: "It is nice to see you.",
//     });
//     io.emit("newUser", {
//         data: "a new user joined",
//     });
//     socket.on("yo", (data) => {
//         console.log(data);
//     });
//     socket.on("disconnect", () => {
//         console.log(`A socket with the id ${socket.id} just DISCONNECTED`);
//     });
// });
