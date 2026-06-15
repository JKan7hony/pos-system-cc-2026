const pool = require('../config/database');
const { validationResult } = require('express-validator');

const getAll = async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categorias WHERE activo = true ORDER BY nombre'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const { nombre, descripcion } = req.body;

    const existe = await pool.query(
      'SELECT id FROM categorias WHERE LOWER(nombre) = LOWER($1)',
      [nombre]
    );

    if (existe.rows.length) {
      return res.status(409).json({
        error: 'La categoría ya existe.'
      });
    }

    const result = await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre.trim(), descripcion || null]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const { nombre, descripcion } = req.body;

    if (nombre) {
      const existe = await pool.query(
        `SELECT id
         FROM categorias
         WHERE LOWER(nombre) = LOWER($1)
         AND id <> $2`,
        [nombre, req.params.id]
      );

      if (existe.rows.length) {
        return res.status(409).json({
          error: 'Ya existe una categoría con ese nombre.'
        });
      }
    }

    const result = await pool.query(
      `UPDATE categorias
       SET nombre = COALESCE($1, nombre),
           descripcion = COALESCE($2, descripcion)
       WHERE id = $3
       RETURNING *`,
      [nombre, descripcion, req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        error: 'Categoría no encontrada.'
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query('UPDATE categorias SET activo = false WHERE id = $1', [req.params.id]);
    res.json({ message: 'Categoría desactivada correctamente.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, create, update, remove };
