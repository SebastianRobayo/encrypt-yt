const client = require("../config/database");

// TODO: Service to create products
const createProduct = async (req, res) => {
  const { name, description, amount, brand } = req.body;

  client.query(
    "INSERT INTO products (name, description, amount, brand) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, amount, brand],
    (err, result) => {
      if (err) {
        res.status(400);
        res.json({
          error:
            "No fue posible registrar el producto, por favor intentelo nuevamente",
          err,
        });
      } else {
        res.status(201);
        res.json({
          message: "Producto registrado exitosamente",
          body: result.rows[0],
        });
      }
    }
  );
};

module.exports = { createProduct };
