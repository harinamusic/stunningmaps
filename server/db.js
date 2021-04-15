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

module.exports.lastRegisteredUsers = function () {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

module.exports.matchingUsers = function (val) {
    return db.query(`SELECT * FROM users WHERE first ILIKE $1`, [val + "%"]);
};

exports.friendshipStatus = function (recipient_id, sender_id) {
    return db.query(
        `SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`,
        [recipient_id, sender_id]
    );
};

exports.sendFriendRequest = function (recipient_id, sender_id) {
    return db.query(
        `INSERT INTO friendships
        (recipient_id, sender_id)
         VALUES ($1, $2)`,
        [recipient_id, sender_id]
    );
};

exports.acceptFriendRequest = function (recipient_id, sender_id) {
    return db.query(
        `UPDATE friendships
            SET accepted = true
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (sender_id = $1 AND recipient_id = $2)
            RETURNING *`,
        [recipient_id, sender_id]
    );
};

exports.deleteFriendship = function (recipient_id, sender_id) {
    return db.query(
        `DELETE FROM friendships
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (sender_id = $1 AND recipient_id = $2)`,
        [recipient_id, sender_id]
    );
};
