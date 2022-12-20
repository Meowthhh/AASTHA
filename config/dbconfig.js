
const mysql=require('mysql')
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database:"aastha",
  // connectionLimit: 15,
  //  port:"3307",
})


db.on("error", (err) => {
    console.log("db error", err);
  })
module.exports = db;