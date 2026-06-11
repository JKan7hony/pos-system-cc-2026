require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/database');
const rateLimit = require('express-rate-limit');
const app = express();

// ─── RATE LIMITING ───────────────────────────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Demasiados intentos de inicio de sesión.'
  }
});

const authRoutes     = require('./routes/auth');
const productRoutes  = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const clientRoutes   = require('./routes/clients');
const saleRoutes     = require('./routes/sales');
const reportRoutes   = require('./routes/reports');
const userRoutes     = require('./routes/users');
const evalRoutes     = require('./routes/eval');

const app = express();

// ─── CORS ────────────────────────────────────────────────────────────────────
// ⚠️ TODO: En producción restringir a dominios específicos:
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

// ─── PARSERS ─────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── ARCHIVOS ESTÁTICOS (imágenes) ───────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');

    res.status(200).json({
      status: 'UP',
      database: 'UP',
      timestamp: new Date().toISOString()
    });

  } catch (error) {

    res.status(503).json({
      status: 'DOWN',
      database: 'DOWN',
      error: error.message
    });

  }
});

// ─── RUTAS ───────────────────────────────────────────────────────────────────
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/clients',    clientRoutes);
app.use('/api/sales',      saleRoutes);
app.use('/api/reports',    reportRoutes);
app.use('/api/users',      userRoutes);
app.use('/api/eval',       evalRoutes);

// ─── MANEJO DE ERRORES GLOBAL ────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

module.exports = app;
