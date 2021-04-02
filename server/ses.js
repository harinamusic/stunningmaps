const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

///looks a lot like s3
//a constructor SES => passing it this configuration

exports.sendEmail = (to, body, subject) =>
    ses
        .sendEmail({
            Source: "Pamela <crocus.dress@spicedling.email>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data:
                            body,
                    },
                },
                Subject: {
                    Data: subject
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));

//sendEmail function that returns an object
