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
