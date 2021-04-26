const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL || "postgres:kathi:kathi@localhost:5432/apple"
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
module.exports.writeBio = function (user_id, bio) {
    return db.query(
        `UPDATE users SET message = $2 WHERE id = $1 RETURNING bio`,
        [user_id, bio]
    );
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

exports.wannabeFriends = function (id) {
    return db.query(
        `SELECT users.id, first, last, profile_pic, accepted
  FROM friendships
  JOIN users
  ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
        `,
        [id]
    );
};

exports.getLastTenMsg = function () {
    return db.query(`SELECT chatmessages.id, chatmessages.message, chatmessages.sender_id, chatmessages.created_at, users.first, users.last, users.profile_pic
FROM chatmessages
JOIN users
ON chatmessages.sender_id = users.id
ORDER BY created_at DESC
LIMIT 10`);
};

module.exports.insertMessage = function (sender_id, message) {
    return db.query(
        `INSERT INTO chatmessages (sender_id, message)
        VALUES ($1, $2)
        RETURNING message`,
        [sender_id, message]
    );
};

exports.friendsOnOtherProfile = function (id) {
    return db.query(
        `SELECT users.id, first, last, profile_pic, accepted
  FROM friendships
  JOIN users

  ON (accepted = true AND recipient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
  
LIMIT 3
        `,
        [id]
    );
};

module.exports.insertDescription = function (marker_id, bio) {
    return db.query(`UPDATE markers SET bio = $2 WHERE id = $1 RETURNING bio`, [
        marker_id,
        bio,
    ]);
};
module.exports.getAllMarkers = function (user_id) {
    return db.query(`SELECT * FROM markers WHERE user_id = $1`, [user_id]);
};

module.exports.addMarker = (lat, lng, user_id, time) => {
    const query = `INSERT INTO markers ( location_lat, location_lng,  user_id, created_at)
    VALUES ($1,$2, $3, $4)
    RETURNING id`;
    const params = [lat, lng, user_id, time];
    console.log(query, params);
    return db.query(query, params);
};
exports.deleteMarker = function (id) {
    return db.query(
        `DELETE FROM markers
            WHERE (id = $1)
            RETURNING *`,
        [id]
    );
};
