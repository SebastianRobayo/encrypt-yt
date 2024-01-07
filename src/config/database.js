const { Client } = require("pg");

const client = new Client({
  host: "",
  user: "",
  password: "*",
  database: "",
  port: ,
});

client.connect((err) => {
  if (err) {
    console.log("Failed to connect to database", err);
  } else {
    console.log("Successful connection to database");
  }
});

module.exports = client;
