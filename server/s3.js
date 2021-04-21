const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("no req.file");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "kathisimageboard",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            console.log("it worked");
            next();
            fs.unlink(path, () => {});
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(
                "Something went wrong while uploading the image to s3",
                500
            );
        });
};
// const aws = require("aws-sdk");
// const fs = require("fs");

// let secrets;
// if (process.env.NODE_ENV == "production") {
//     secrets = process.env; // in prod the secrets are environment variables
// } else {
//     secrets = require("./../secrets"); // in dev they are in secrets.json which is listed in .gitignore
// }

// const s3 = new aws.S3({
//     accessKeyId: secrets.AWS_KEY,
//     secretAccessKey: secrets.AWS_SECRET,
// });

// exports.upload = (req, res, next) => {
//     if (!req.file) {
//         console.log("no req.file");
//         return res.sendStatus(500);
//     }

//     const { filename, mimetype, size, path } = req.file;

//     s3.putObject({
//         Bucket: "spicedling",
//         ACL: "public-read",
//         Key: filename,
//         Body: fs.createReadStream(path),
//         ContentType: mimetype,
//         ContentLength: size,
//     })
//         .promise()
//         .then(() => {
//             // it worked!
//             next();
//             fs.unlink(path, () => {});
//         })
//         .catch((e) => {
//             console.log(e);
//             res.sendStatus(500);
//         });
// };
