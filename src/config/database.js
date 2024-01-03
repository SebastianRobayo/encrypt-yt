const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "Iron2024*",
  database: "exampleencrypt",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log("Failed to connect to database", err);
  } else {
    console.log("Successful connection to database");
  }
});

module.exports = client;
