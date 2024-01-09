require("dotenv").config();
const express = require("express");
const routerU = require("./routes/user.routes");
const routerP = require("./routes/products.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(routerU, routerP);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
