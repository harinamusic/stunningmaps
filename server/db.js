const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:kathi:kathi@localhost:5432/socialnetwork"
);
module.exports.addUser = (first, last, email, password) => {
    const query = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;
    const params = [first, last, email, password];
    console.log(query, params);
    return db.query(query, params);
};
module.exports.userLogin = (email) => {
    return db.query(`SELECT id, password FROM users WHERE email = $1`, [email]);
};

module.exports.verifyEmail = function (email) {
    return db.query(`SELECT email FROM users WHERE email = $1 `, [email]);
};

module.exports.insertCode = function (code, email) {
    return db.query(
        `INSERT INTO password_reset_codes (code, email) VALUES ($1, $2) RETURNING code, email`,
        [code, email]
    );
};

module.exports.getCode = function (email) {
    return db.query(
        `SELECT * FROM password_reset_codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1 ORDER BY created_at DESC LIMIT 1`,
        [email]
    );
};

module.exports.updatePassword = function (newPassword, email) {
    return db.query(`UPDATE users SET password = $1 WHERE email = $2`, [
        newPassword,
        email,
    ]);
};

module.exports.getUserData = function (id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

module.exports.addProfilePic = function (userId, url) {
    return db.query(
        `UPDATE users SET profile_pic = $2 WHERE id = $1 RETURNING profile_pic`,
        [userId, url]
    );
};
module.exports.writeBio = function (userId, bio) {
    return db.query(`UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio`, [
        userId,
        bio,
    ]);
};

// module.exports.getOtherUserInfo = function (
//     userId,
//     first,
//     last,
//     profile_pic,
//     bio
// ) {
//     return db.query(`SELECT * FROM users WHERE id = $1`, [
//         userId,
//         first,
//         last,
//         profile_pic,
//         bio,
//     ]);
// };
