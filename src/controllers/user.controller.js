const client = require("../config/database");
const { encrypt, verified } = require("../utils/encrypt");
const { generateToken } = require("../utils/jwt");

// TODO: Service to create user
const createUser = async (req, res) => {
  const { name, password, email, phone } = req.body;

  const passHash = await encrypt(password);

  client.query(
    "INSERT INTO users (name, password, email, phone) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, passHash, email, phone],
    (err, result) => {
      if (err) {
        res.status(400);
        res.json(
          {
            error:
              "No fue posible registrar el usuario, por favor intentelo nuevamente",
          },
          err
        );
      } else {
        res.status(201);
        res.json({
          message: "Usuario registrado exitosamente",
          body: result.rows[0],
        });
      }
    }
  );
};

// TODO: Service to login user
const login = async (req, res) => {
  const { email, password } = req.body;

  client.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    async (err, result) => {
      if (err) {
        res.status(500);
        res.json({
          error: "Error al buscar al usuario",
          err,
        });
      } else if (result.rows.length > 0) {
        const user = result.rows[0];

        const match = await verified(password, user.password);
        const token = generateToken(user.email);

        if (match) {
          res.status(200);
          res.json({ message: "Inicio de sesión exitoso", user, token });
        } else {
          res.status(401);
          res.json({ error: "Contraseña incorrecta" });
        }
      } else {
        res.status(404);
        res.json({ error: "Usuario no encontrado" });
      }
    }
  );
};

module.exports = { createUser, login };
