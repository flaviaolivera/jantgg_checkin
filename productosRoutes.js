const express = require("express");
const router = express.Router();
const { Producto } = require("./models");
const logger = require("./logger");
const verifyToken = require("./verifyToken");

// Middleware para validar el cuerpo de la solicitud en operaciones POST y PUT
const validateProducto = (req, res, next) => {
  const { titulo, descripcion, estado } = req.body;
  if (!titulo || !descripcion || !estado) {
    return res
      .status(400)
      .send("La solicitud debe contener titulo, descripcion y estado");
  }
  next();
};

// POST endpoint para crear un nuevo producto
router.post("/", verifyToken, validateProducto, async (req, res) => {
  try {
    const producto = await Producto.create({
      ...req.body,
      UsuarioId: req.userId,
    });
    res.status(201).send(producto);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Error al crear el producto");
  }
});

// GET endpoint para recuperar todos los productos
router.get("/", verifyToken, async (req, res) => {
  try {
    const productos = await Producto.findAll({
      attributes: [
        "id",
        "titulo",
        "descripcion",
        "estado",
        "fecha_de_creacion",
      ],
    });
    res.send(productos);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Error al recuperar los productos");
  }
});

// GET endpoint para recuperar un producto por id
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  if (!parseInt(id, 10)) {
    return res.status(400).send("El ID del producto debe ser un número");
  }

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    res.send(producto);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Error al recuperar el producto");
  }
});

// PUT endpoint para actualizar un producto
router.put("/:id", verifyToken, validateProducto, async (req, res) => {
  const { id } = req.params;
  if (!parseInt(id, 10)) {
    return res.status(400).send("El ID del producto debe ser un número");
  }

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    await producto.update(req.body);
    res.send(producto);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Error al actualizar el producto");
  }
});

// DELETE endpoint para eliminar un producto
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  if (!parseInt(id, 10)) {
    return res.status(400).send("El ID del producto debe ser un número");
  }

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    await producto.destroy();
    res.send("Producto eliminado con éxito");
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Error al eliminar el producto");
  }
});

module.exports = router;
